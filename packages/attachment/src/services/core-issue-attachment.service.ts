import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import { MultipartFile } from "@fastify/multipart";
import { adminStorage } from "../app/stores";
import { IssueAttachmentService } from "./interfaces/issue-attachment.service";
import { IssueAttachmentRepository } from "../repositories/interfaces/issue-attachment.repository";
import { IssueAttachmentEntity } from "../app/entities";
import { ServiceResponse } from "@sourabhrawatcc/core-utils";

export class CoreIssueAttachmentService implements IssueAttachmentService {
  constructor(
    private readonly issueAttachmentRepository: IssueAttachmentRepository,
  ) {}

  createIssueAttachment = async (
    id: string,
    userId: string,
    file: MultipartFile,
  ) => {
    const data = await file.toBuffer();
    const contentType = file.mimetype;
    const sizes = { small: { width: 250 }, large: { width: 1200 } };
    const smallImageBuffer = await sharp(data)
      .resize(sizes.small.width)
      .toBuffer();
    const largeImageBuffer = await sharp(data)
      .resize(sizes.large.width)
      .toBuffer();
    const filename = uuidv4();
    const smallImagePath = `attachments/${id}/${filename}-small`;
    const largeImagePath = `attachments/${id}/${filename}-large`;

    await adminStorage
      .file(smallImagePath)
      .save(smallImageBuffer, { contentType });
    await adminStorage
      .file(largeImagePath)
      .save(largeImageBuffer, { contentType });

    const issueAttachment = new IssueAttachmentEntity();
    issueAttachment.issueId = id;
    issueAttachment.ownerId = userId;
    issueAttachment.contentType = contentType;
    issueAttachment.path = smallImagePath;
    issueAttachment.bucket = "issue-tracker-66803.appspot.com";
    issueAttachment.filename = filename;
    issueAttachment.originalFilename = file.filename;

    await this.issueAttachmentRepository.save(issueAttachment);
  };

  getIssueAttachmentList = async (id: string) => {
    const rows = await this.issueAttachmentRepository.find(id);

    return new ServiceResponse({ rows, filteredRowCount: rows.length });
  };
}
