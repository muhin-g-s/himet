import { POSITION, TYPE, useToast } from 'vue-toastification';

export default class NotificationService {
	private toast = useToast();

	public error(text: string): void {
		this.toast(text, {
			type: TYPE.ERROR,
			timeout: 2000,
			position: POSITION.BOTTOM_RIGHT,
		});
	}

	public success(text: string): void {
		this.toast(text, {
			type: TYPE.SUCCESS,
			timeout: 2000,
			position: POSITION.BOTTOM_RIGHT,
		});
	}

	public info(text: string): void {
		this.toast(text, {
			type: TYPE.INFO,
			timeout: 2000,
			position: POSITION.BOTTOM_RIGHT,
		});
	}

	public warning(text: string): void {
		this.toast(text, {
			type: TYPE.WARNING,
			timeout: 2000,
			position: POSITION.BOTTOM_RIGHT,
		});
	}
}
