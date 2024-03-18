import mitt, { Emitter, Handler } from 'mitt';

export const enum EventEnum {
	CHANGE_NOTE = 'CHANGE_NOTE',
}

type EventBusType = Emitter<{
	message: string;
	[key: string]: unknown;
}>;

export default class EventBusService {
	private eventBus: EventBusType;
	private broadcastChannel;

	constructor() {
		this.eventBus = mitt();
		this.broadcastChannel = new BroadcastChannel('event-bus');

		this.broadcastChannel.addEventListener('message', () => {
			this.eventBus.emit(EventEnum.CHANGE_NOTE);
		});
	}

	on<T extends string | number>(event: EventEnum, handler: Handler<{ [key: string]: unknown; message: string }[T]>) {
		this.eventBus.on<T>(event as T, handler);
	}

	emit(event: EventEnum) {
		this.eventBus.emit(event);
		this.broadcastChannel.postMessage(event);
	}
}
