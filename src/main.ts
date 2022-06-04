import { apiThrottler } from '@grammyjs/transformer-throttler';

import { Bot, session } from 'grammy';

import { initShedules } from './shedule';

import { composer } from './telegram';
import { BotContext } from './interfaces/telegram';

import { telegramApiKey } from './config';

export const bot = new Bot<BotContext>(telegramApiKey);

bot.api.config.use(apiThrottler());

bot.use(session());
bot.use(composer);

bot.start();

initShedules(bot);
