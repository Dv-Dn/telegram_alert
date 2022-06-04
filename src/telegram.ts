import { Keyboard, InlineKeyboard, Composer } from 'grammy';
// import { Router } from "@grammyjs/router";
import { UserService } from './services/user.service';

import { User } from 'grammy/out/platform.node';
import { TranslateService } from './services/translate.service';
import { generateInstruction } from './helpers/generateInsctuction';
import { BotContext, BotCommands, Languages } from './interfaces/telegram';

const composer = new Composer<BotContext>();

const keyboard = new InlineKeyboard();

for (let lang in Languages) {
  const withPrefix = `language_${lang}`;

  keyboard.text(lang, withPrefix);

  composer.callbackQuery(withPrefix, async (ctx) => {
    const userId = ctx.from.id;
    console.log(lang);
    await UserService.updateUser(userId, { preferred_language: lang });

    await ctx.answerCallbackQuery({
      text: `Language selected: ${lang}!`,
    });

    await ctx.deleteMessage();
  });
}

// Start
composer.command(BotCommands.start, async (ctx) => {
  const user = await UserService.getOrCreateUser(ctx.from as User);
  await ctx.reply('Check out this menu:', { reply_markup: keyboard });
  ctx.reply(
    [`Welcome, ${user?.first_name}!`, generateInstruction()].join('\n')
  );
});

// Add
composer.command(BotCommands.add, async (ctx) => {
  ctx.session.lastAction = BotCommands.add;
  await ctx.reply('Check out this menu:', { reply_markup: keyboard });
  // await ctx.reply('Check out this menu:', { reply_markup: languageSelect });
});

// Message
composer.on('message:text', async (ctx, next) => {
  const text = ctx.message.text;
  const userId = ctx.from.id;

  if (text)
    switch (ctx.session.lastAction) {
      case BotCommands.add:
        await TranslateService.addTanslate(text, userId);
        break;

      default:
        break;
    }

  await next();
});

export { composer };
