import {
  type CloudEvent,
  type IBroker,
  type UserRegisteredData,
  Streams,
  Consumer,
  UserRegisteredEvent,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import type { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import type { IOnboardingService } from "@/features/onboarding/services";

@injectable()
export class PlatformUserOnboardingConsumer extends Consumer<CloudEvent<UserRegisteredData>> {
  readonly stream = Streams.IDENTITY;
  readonly consumer = "platform-user-onboarding";
  readonly subjects = [UserRegisteredEvent.type];

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.OnboardingService)
    private readonly onboardingService: IOnboardingService,
  ) {
    super(broker.client);
  }

  onMessage = async (
    message: JsMsg,
    payload: CloudEvent<UserRegisteredData>,
  ): Promise<void> => {
    if (payload.type !== UserRegisteredEvent.type) {
      message.ack();
      return;
    }

    const event = validateEvent(UserRegisteredEvent, payload);
    const data = event.data;
    if (!data) {
      message.ack();
      return;
    }

    await this.onboardingService.provisionPersonalWorkspace(data.userId);
    message.ack();
  };
}
