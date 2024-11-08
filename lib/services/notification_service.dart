import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutter/material.dart';

class NotificationService {
  static final FlutterLocalNotificationsPlugin _notificationsPlugin =
      FlutterLocalNotificationsPlugin();

  static void initialize() {
    const AndroidInitializationSettings androidSettings =
        AndroidInitializationSettings('@mipmap/ic_launcher');
    const InitializationSettings settings = InitializationSettings(
      android: androidSettings,
    );

    _notificationsPlugin.initialize(
      settings,
      // onSelectNotification: (String? payload) async {
      //   if (payload != null) {
      //     navigatorKey.currentState?.pushNamed(payload);
      //   }
      // },

      
    );
  }

  static Future<void> showNotification({
    required String title,
    required String body,
    String? payload,
  }) async {
    const AndroidNotificationDetails androidDetails = AndroidNotificationDetails(
      'supabase_channel_id',
      'Supabase Notifications',
      channelDescription: 'Notifications from Supabase',
      importance: Importance.high,
      priority: Priority.high,
      styleInformation: BigTextStyleInformation(''), // expanded style
    );

    const NotificationDetails details = NotificationDetails(android: androidDetails);

    await _notificationsPlugin.show(
      0,
      title,
      body,
      details,
      payload: payload,
    );
  }
}
