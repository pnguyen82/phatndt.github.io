---
title: Vim to Emacs, a simple configuration that won't blow your mind
categories: editor vim emacs
---
Emacs - An extensible, customizable, free/libre text editor

<!--more-->
![Emacs overview](/assets/images/vim2emacs/window-sample.png)

I'm a `vim` user but I'm learning Clojure now, so I decided to give `emacs` a try.  
If you have no idea what Emacs is, I recommend you to check this guide before continue  
- [Absolute Beginner's Guide to Emacs](http://www.jesshamrick.com/2012/09/10/absolute-beginners-guide-to-emacs/)

Key Prefix meaning:
- `C`: `Control`
- `M`: `Alt`/`Option`
- `s`: `Command`/`Window`
- `C-c`: Hold `Control` and `c`

You don't have to remember all the command, the list below is enough:
- `M-x`: execute extended command.
- `C-x C-c`: quit emacs
- `C-g`: cancel, like `Esc` in vim
- `C-x C-f`: open file
- `C-x b`: switch buffers

## Install Emacs
- [GUI version](https://emacsformacosx.com/)
- or `brew install emacs` 

## The configuration file
Download the config file and save it in your home dir `~/.emacs`
```bash
curl https://raw.githubusercontent.com/felixvo/dotfiles/master/emacs/init.el>~/.emacs
```
Then open your `emacs`. Hopefully, you will see the UI below

![Emacs overview](/assets/images/vim2emacs/overview.png)

### projectile-discover-projects
basiclly this step will tell `emacs` where is your projects

>To add a project to Projectile's list of known projects, open a file in the project. If you have a projects directory, you can tell Projectile about all of the projects in it with the command `M-x`
>`projectile-discover-projects-in-directory`  
> [Projectile Docs](https://docs.projectile.mx/en/latest/usage/)

![emacs project discover](/assets/images/vim2emacs/project-discover.png)

## Usage
1. window management the vim way
- `:vs` horizontal split
- `:sp` vertical split
- `C-w C-w` or `C-h/j/k/l`: switch around window
- `:close` or `C-x 0`: close current window
- `C-x 1`: close other windows
![emacs window](/assets/images/vim2emacs/windows.png)

2. manage open buffers
- `C-p`: show list buffer and recent files (helm-mini window)
- `C-x C-b`: list buffer
- `s-p` (command+p): list buffer in project
- `:bd`: close buffer
- `:bn`/`:bp`: next/previous buffer
![emacs buffer](/assets/images/vim2emacs/find buffers.png)

2. switch project
- `s-p p` (command+p p): swith project
![emacs switch project](/assets/images/vim2emacs/switch-project.png)

3. find files in project 
- `s-p f` (command+p f): find files in current project
- `s-p F` (command+p F): find files in all project
![emacs find files in project](/assets/images/vim2emacs/find-file-in-project.png)

4. grep in project
- `s-p s g` (command+p s g): grep in current project
![emacs grep in project](/assets/images/vim2emacs/grep-in-project.png)

5. file explorer
- `C-x C-j`: open file explorer in current buffer
![emacs file explorer](/assets/images/vim2emacs/file-explorer.png)

6. helm mini
- `C-p`: show list buffer and recent files (helm-mini window)
![emacs helm mini](/assets/images/vim2emacs/helm-mini.png)

**you can click on `projectile` in the status bar below for more commands**
![emacs projectile menu](/assets/images/vim2emacs/projectile-menu.png)

## References
highly recommend you to check out the links below for more details

- [Absolute Beginner's Guide to Emacs](http://www.jesshamrick.com/2012/09/10/absolute-beginners-guide-to-emacs/)
- [From Vim to Emacs in Fourteen Days](https://blog.aaronbieber.com/2015/05/24/from-vim-to-emacs-in-fourteen-days.html)
- [Exploring large projects with Projectile](http://tuhdo.github.io/helm-projectile.html#sec-1-1)

