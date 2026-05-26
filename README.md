# React Native Bank App

Учебный мобильный банковский клиент на React Native. Разработан для защиты проекта на J3 по React Native.

## Что умеет приложение

- **Главная страница** — список счетов с балансом: основной, сберегательный и копилка
- **Перевод средств** — выбор счёта-источника, счёта-получателя, суммы и даты; локальное уведомление после успешного перевода
- **История транзакций** — хронологический список операций с фильтрацией по дате

Данные хранятся в памяти (mock API), реального сервера нет.

## Стек

| Слой | Библиотека |
| --- | --- |
| UI | React Native 0.85 |
| Навигация | React Navigation (Stack + Bottom Tabs) |
| Состояние | Redux Toolkit + React Redux |
| Уведомления | @notifee/react-native |
| Разрешения | react-native-permissions |
| HTTP-клиент | Axios (зарезервирован для реального API) |

## Структура проекта

```text
src/
├── components/     # AccountCard, Button, Input, Select
├── constants/      # Тема (цвета, размеры)
├── hooks/          # useAppInit — инициализация при старте
├── navigation/     # RootNavigator (Stack + Tab)
├── screens/        # Dashboard, Transfer, TransactionHistory
├── services/       # api.js (mock), notificationService.js
├── store/          # Redux store + bankSlice
└── utils/          # delay, formatters
```

## Требования

- Node.js >= 22.11.0
- Ruby (для CocoaPods, только iOS)
- Xcode (iOS) или Android Studio (Android)
- CocoaPods: `sudo gem install cocoapods`

## Запуск после клонирования

### 1. Установить зависимости

```bash
npm install
```

### 2. Установить iOS-поды (только macOS)

```bash
cd ios && pod install && cd ..
```

### 3. Запустить Metro

```bash
npm start
```

### 4. Запустить на симуляторе / устройстве

**iOS:**

```bash
npm run ios
```

**Android:**

```bash
npm run android
```

> Для Android нужен запущенный эмулятор или подключённое устройство с включённой отладкой по USB.

## Полезные команды

```bash
npm test          # запуск тестов (Jest)
npm run lint      # проверка кода (ESLint)
```
