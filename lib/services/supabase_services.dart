import 'package:supabase_flutter/supabase_flutter.dart';
import 'notification_service.dart';

class SupabaseService {
  static const String supabaseUrl = 'https://your-supabase-url.supabase.co';
  static const String supabaseAnonKey = 'your-supabase-anon-key';

  static final SupabaseClient _client = Supabase.instance.client;

  static Future<void> initialize() async {
    await Supabase.initialize(
      url: supabaseUrl,
      anonKey: supabaseAnonKey,
    );

    NotificationService.initialize();
    _listenToRealtimeChanges();
  }

  static void _listenToRealtimeChanges() {
    _client
        .from('notifications')
        .stream(primaryKey: [])
        .listen((List<Map<String, dynamic>> data) {
          if (data.isNotEmpty) {
            final newNotification = data.last;
            NotificationService.showNotification(
              title: newNotification['title'] ?? 'New Notification',
              body: newNotification['body'] ?? 'You have a new update',
              payload: newNotification['screen'], // Destination screen
            );
          }
        });
  }
}
