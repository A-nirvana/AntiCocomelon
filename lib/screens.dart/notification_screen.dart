import 'package:flutter/material.dart';

class NotificationScreen extends StatelessWidget {
  final String? data;
  const NotificationScreen({Key? key, this.data}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Notification")),
      body: Center(
        child: Text("Navigated to screen with data: $data"),
      ),
    );
  }
}
