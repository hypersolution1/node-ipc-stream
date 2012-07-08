IPC-Stream
==========
A stream wrapper around IPC channels for forked instances


Motivation
----------
The initial motivation for this library was to make dnode usable over IPC
channels for forked instances. It can be used to stream any data via node.js
style pipes over the IPC channel created from forking instances via the native
`child_process` module.