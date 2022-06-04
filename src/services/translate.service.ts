// export

import { prisma } from '../prisma';

import translate from 'translate';
import {
  correctTime,
  prefferedTimeType,
  updatedNotificationTimeByStep,
} from '../helpers/time';
import { UserService } from './user.service';
import { Notification } from '@prisma/client';

export class TranslateService {
  constructor() {}
  static async addTanslate(text: string, userId: number) {
    try {
      const user = await UserService.getOrCreateUser({ id: userId });
      const translatedText = await translate(text, user.preferred_language);

      const date = new Date();

      const correctedTime = correctTime(
        date,
        user.preffered_time as prefferedTimeType
      );
      const sheduleDate = updatedNotificationTimeByStep(correctedTime, 0);

      await prisma.notification.create({
        data: {
          imageUrl: '',
          step: 0,
          text,
          sheduleDate,
          translate: translatedText,
          userId,
        },
      });
    } catch (error) {}
  }
  private static async getDailyNotifications() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    try {
      const notf = await prisma.notification.findMany({
        where: {
          sheduleDate: {
            gte: start,
            lt: end,
          },
        },
      });

      return notf;
    } catch (error) {
      return [];
    }
  }

  static async getDailyNotificationsAndIncrementStep() {
    const notifications = await this.getDailyNotifications();

    for (let notification of notifications)
      await this.uptateNitificationSheduleDate(notification);

    return notifications;
  }

  static async uptateNitificationSheduleDate(notification: Notification) {
    if (notification.step == 4) {
      await prisma.notification.delete({ where: { id: notification.id } });
    } else
      this.updateNotification(notification.id, {
        step: notification.step + 1,
        sheduleDate: updatedNotificationTimeByStep(
          notification.sheduleDate,
          notification.step + 1
        ),
      });
  }

  static async updateNotification(id: number, data: Partial<Notification>) {
    try {
      return await prisma.notification.update({ where: { id }, data });
    } catch (error) {
      return {};
    }
  }
}
