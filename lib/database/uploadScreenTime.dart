import 'package:app/model/screenModel.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

Future<void> uploadScreenTime(screenModel screen) async {
  final supabase = Supabase.instance.client;

  final response = await supabase.from('screenTimeData').insert({
    'name': screen.name,
    'start_timer': screen.startTime,
    'end_timer': screen.endTime,
    'duration': screen.duration,
  });

  if (response.error != null) {
    print('Error uploading data: ${response.error!.message}');
  } else {
    print('Data uploaded successfully');
  }
}
