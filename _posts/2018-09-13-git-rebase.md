---
title: Git Rebase, when to use it?
categories: git
---

>`git rebase` in its simplest form is a command which will merge another branch
<!--more-->
>into the branch where you are currently working,
>and move all of the local commits that are ahead of the rebased branch to the top of the history
>on that branch.

## The Golden Rule of Rebasing
>Once you understand what rebasing is, the most important thing to learn is when not to do it.
>The golden rule of git rebase is to *NEVER* use it on public branches.

So you should alway run git commant like this
``` bash
git checkout feature-xxx
git rebase master
```

source:
- [Merging vs Rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)
- [Git Merge vs. Rebase: What’s the Diff?](https://hackernoon.com/git-merge-vs-rebase-whats-the-diff-76413c117333)
- [Don't Be Scare Of Git Merge](https://nathanleclaire.com/blog/2014/09/14/dont-be-scared-of-git-rebase)
