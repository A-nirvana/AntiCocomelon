import 'dart:async';
import 'package:flutter/material.dart';

class ScreenTimeTracker with WidgetsBindingObserver {
  DateTime? _startTime;
  DateTime? _endTime;
  Duration _screenTime = Duration.zero;
  Timer? _timer;

  void startTimer() {
    _startTime ??= DateTime.now(); 
    _timer = Timer.periodic(Duration(seconds: 1), (timer) {
      _screenTime += Duration(seconds: 1);
    });
  }

  void stopTimer() {
    if (_startTime != null) {
      _screenTime += DateTime.now().difference(_startTime!);
      _startTime = null;
    }
    _timer?.cancel();
    _endTime = DateTime.now();
  }

  Duration get screenTime => _screenTime;
  DateTime? get startTime => _startTime;
  DateTime? get endTime => _endTime;

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) {
      startTimer();
    } else if (state == AppLifecycleState.paused || state == AppLifecycleState.detached) {
      stopTimer();
    }
  }
}
