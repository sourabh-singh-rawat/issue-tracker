import {
  EmailMessage,
  JwtToken,
  Mailer,
  NodeMailer,
  NotFoundError,
  ProjectMemberPayload,
  UserCreatedPayload,
  WorkspaceInvitePayload,
} from "@sourabhrawatcc/core-utils";
import { EmailEntity } from "../app/entities/email.entity";
import { EmailService } from "./interfaces/email.service";
import { EmailRepository } from "../repositories/interfaces/email.repository";
import { UserRepository } from "../repositories/interfaces/user.repository";
import { EmailCreatedPublisher } from "../messages/publishers/email-created.publisher";

export class CoreEmailService implements EmailService {
  constructor(
    private readonly mailer: Mailer,
    private readonly userRepository: UserRepository,
    private readonly emailRepository: EmailRepository,
    private readonly emailCreatedPublisher: EmailCreatedPublisher,
  ) {}

  createEmail = async (receiverEmail: string) => {
    const newSentEmail = new EmailEntity();
    newSentEmail.receiverEmail = receiverEmail;

    await this.emailRepository.save(newSentEmail);
  };

  createInviteToken = <T>(payload: T) => {
    return JwtToken.create(payload, process.env.JWT_SECRET!);
  };

  sendVerificationEmail = async (payload: UserCreatedPayload) => {
    const { email, userId } = payload;
    const token = this.createInviteToken(payload);
    const message: EmailMessage = {
      title: "Please confirm your email",
      html: `
        <strong>
          <p>Please click this <a href="https://localhost/api/v1/users/${userId}/confirm?inviteToken=${token}">link</a> to confirm your email </p>
        </strong>
      `,
    };

    await this.mailer.send("noreply@test.com", email, message);
    await this.createEmail(email);

    const sentEmail = await this.emailRepository.findByEmail(email);
    if (!sentEmail) throw new NotFoundError("Email not found");
    await this.emailCreatedPublisher.publish(sentEmail);
  };

  sendWorkspaceInvitation = async (payload: WorkspaceInvitePayload) => {
    const { senderEmail, receiverEmail, senderName, workspaceId } = payload;
    const token = this.createInviteToken(payload);
    const message: EmailMessage = {
      title: `You are invited to join workspace by ${senderName}`,
      html: `
        <strong>
          <p>You are invited to Workspace: ${workspaceId} by ${senderName}</p>
        </strong>
        <a href="https://localhost/api/v1/workspaces/${workspaceId}/invite/confirm?inviteToken=${token}">
          Click to Accept Invite
        </a> 
      `,
    };

    await this.mailer.send(senderEmail, receiverEmail, message);
    await this.createEmail(receiverEmail);
  };

  sendProjectInvitation = async (payload: ProjectMemberPayload) => {
    const { userId, projectId, role, createdBy } = payload;

    const receiver = await this.userRepository.findById(userId);
    const sender = await this.userRepository.findById(createdBy);

    if (!receiver) throw new Error("No receiver found");
    if (!sender) throw new Error("Sender not found");

    const token = this.createInviteToken(payload);
    const message: EmailMessage = {
      title: `You are invited to join project by ${sender.displayName}`,
      html: `
      <strong>
        <p>You are invited to Project: ${projectId} by ${sender.displayName} for ${role} role</p>
      </strong>
      <a href="https://localhost/api/v1/projects/${projectId}/members/confirm?inviteToken=${token}">
        Click to Accept Invite
      </a> 
    `,
    };
    await this.mailer.send(sender.email, receiver.email, message);
    await this.createEmail(receiver.email);
  };
}
