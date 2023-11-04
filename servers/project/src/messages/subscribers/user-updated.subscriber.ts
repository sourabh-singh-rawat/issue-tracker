import {
  Consumers,
  NatsMessenger,
  Streams,
  Subscriber,
  UserUpdatedPayload,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { UserService } from "../../services/interfaces/user.service";

export class UserUpdatedSubscriber extends Subscriber<UserUpdatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserUpdatedConsumerProject;

  constructor(
    private messenger: NatsMessenger,
    private userService: UserService,
  ) {
    super(messenger.client);
  }

  onMessage = async (message: JsMsg, payload: UserUpdatedPayload) => {
    const { userId, defaultWorkspaceId, version } = payload;
    await this.userService.updateUser(userId, defaultWorkspaceId, version);
    message.ack();
    console.log("Message processing completed");
  };
}
