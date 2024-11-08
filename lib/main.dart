import 'package:app/utils/screentime.dart';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'dart:async';

final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

Future<void> main() async {
  await Supabase.initialize(
    url: 'https://uwkvstiiuwsewsfqtuzn.supabase.co',
    anonKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3a3ZzdGlpdXdzZXdzZnF0dXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwNjAxNTAsImV4cCI6MjA0NjYzNjE1MH0.m9hfJgyi2MG3sa31hIlgQDh9jnsvgcP47vZkikbsAug',
  );
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> with WidgetsBindingObserver {
  late final WebViewController _controller;
  final ScreenTimeTracker _tracker = ScreenTimeTracker();
  Timer? _uploadTimer;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(_tracker);
    _tracker.startTimer();

    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..loadRequest(Uri.parse("https://movie-harvest.vercel.app/"));

    _startUploadTimer();
  }

  @override
  void dispose() {
    _uploadTimer?.cancel(); 
    _tracker.stopTimer();
    WidgetsBinding.instance.removeObserver(_tracker);
    super.dispose();
  }

  void _startUploadTimer() {
    _uploadTimer = Timer.periodic(Duration(minutes: 1), (timer) async {
      await _uploadScreenTime();
    });
  }

  Future<void> _uploadScreenTime() async {
    final supabase = Supabase.instance.client;

    final startTime = _tracker.startTime?.toIso8601String() ?? '';
    final endTime = DateTime.now().toIso8601String();
    final duration = _tracker.screenTime.inSeconds;

    final response = await supabase.from('tasks').insert({
      'name': 'Home', 
      'start_timer': startTime,
      'end_timer': endTime,
      'duration': duration,
    });

    if (response.error != null) {
      print('Error uploading data: ${response.error!.message}');
    } else {
      print('Data uploaded successfully');
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      navigatorKey: navigatorKey,
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: SafeArea(
          child: WebViewWidget(controller: _controller),
        ),
      ),
    );
  }
}
