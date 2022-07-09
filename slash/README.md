## OMG, what it this ? 
When you opened this file, you were probably shocked, maybe even afraid.
You may wonder why the same commands are rewritten in the commands folder and the slash folder, and why the slash folder is not sorted?

The answer is simple: when AtlantaBot was created, application commands didn't exist, therefore, their scope is not enabled everywhere, so that commands are not synchronized with servers.

To solve this problem, in addition to the classic commands folder, in production we added a slash folder that includes the commands to be loaded. This folder has been created for production purposes, in order to test the commands. Please note that you can delete it, all its contents are also in the commands folder.