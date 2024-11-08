import 'package:uuid/uuid.dart';

class screenModel {
  String id;
  String name;
  String startTime;
  String endTime;
  int duration;

  screenModel({
    String? id,
    required this.name,
    required this.startTime,
    required this.endTime,
    required this.duration,
  }) : id = id ?? Uuid().v4();
  Map<String, dynamic> toMap() {
    return {
      // 'id': id,
      'name': name,
      'startTime': startTime,
      'endTime': endTime,
      'duration': duration,
    };
  }
}
