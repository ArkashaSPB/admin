import { create } from "zustand";
import {getCountNewAPI} from "../api/siteAPI.js";

const useNewCountStore = create((set) => {
	let interval = null;

	return {
		newCount: 0,
		// Функция для обновления newCount (можно вызвать из любого места)
		fetchNewCount: async () => {
			try {
				const data = await getCountNewAPI();
				set({ newCount: data });
			} catch (error) {
				console.error("Ошибка при получении новых заказов:", error);
			}
		},

		// Автоматический запуск интервала
		startAutoUpdate: () => {
			if (!interval) {
				setTimeout(() => {
					useNewCountStore.getState().fetchNewCount(); // Запрашиваем сразу при запуске
				}, 0);

				interval = setInterval(() => {
					useNewCountStore.getState().fetchNewCount();
				}, 60 * 1000);
			}
		},

		// Остановка автообновления (если нужно)
		stopAutoUpdate: () => {
			if (interval) {
				clearInterval(interval);
				interval = null;
			}
		}
	};
});

// Запускаем автообновление при старте
useNewCountStore.getState().startAutoUpdate();

export default useNewCountStore;
