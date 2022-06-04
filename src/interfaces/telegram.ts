import { Context, SessionFlavor } from 'grammy';

enum BotCommands {
  add = 'add',
  clearchat = 'clearchat',
  start = 'start',
  alert = 'alert',
  notificationslist = 'notificationslist',
}

enum Languages {
  ua = 'ua',
  ru = 'ru',
}

// const languages = ['ru', 'ua'];
enum UserSteps {
  start = 'start',
}

interface SessionData {
  lastAction: BotCommands;
  step: UserSteps;
}

type BotContext = Context & SessionFlavor<SessionData>;

export { BotCommands, Languages, BotContext };
