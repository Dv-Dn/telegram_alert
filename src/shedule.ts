import { scheduleJob } from 'node-schedule';

import { TranslateService } from './services/translate.service';
import { BotContext } from './interfaces/telegram';
import { Bot } from 'grammy';

async function dailyCheck(bot: Bot<BotContext>) {
  const notifications =
    await TranslateService.getDailyNotificationsAndIncrementStep();

  notifications.forEach(async (notf) => {
    scheduleJob(notf.sheduleDate, async () => {
      await bot.api.sendMessage(
        notf.userId || 0,
        `${notf.text} /n ${notf.translate}`
      );
    });
  });
}

export function initShedules(bot: Bot<BotContext>) {
  scheduleJob('0 15 0 * * *', () => dailyCheck(bot));

  console.log('SHEDULES INITED');
}
