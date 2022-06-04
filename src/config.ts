import nconf from 'nconf';

nconf.argv().env().file('config.json');

const telegram = nconf.get('telegram');

export const telegramApiKey = telegram.telegramApiKey;
