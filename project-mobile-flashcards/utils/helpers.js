import React from "react";
import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

const NOTIFICATION_KEY = "MobileFlashCards:notifications";

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(a => {
    Notifications.cancelAllScheduledNotificationsAsync;
  });
}

function createNotification() {
  return {
    title: "continue quiz!",
    body: "👋 don't forget to finish your quiz!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: new Date().getTime() + 1000,
              repeat: "hour"
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
