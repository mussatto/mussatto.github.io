---
layout: post
title:  "Java - Memory Dump Analyse"
date:   2016-10-15 00:00:00
categories: java memory dump analyse
---

Thread->
create object with:
string
another object
number

sleep 5 seconds

jmap -heap:format=b <process-id>

Attaching to process ID 21586, please wait...
Error attaching to process: sun.jvm.hotspot.debugger.DebuggerException: Can't attach to the process: ptrace(PTRACE_ATTACH, ..) failed for 21586: Operation not permitted
sun.jvm.hotspot.debugger.DebuggerException: sun.jvm.hotspot.debugger.DebuggerException: Can't attach to the process: ptrace(PTRACE_ATTACH, ..) failed for 21586: Operation not permitted
