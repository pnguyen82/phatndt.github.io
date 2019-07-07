A guide for installing Arch Linux

<!--more-->
[Complete Guide](https://wiki.archlinux.org/index.php/Installation_guide)  
Becasue there's no UI when installing Arch and so many command to remember, so I recommended to list all document you need
then just `curl` to get the document.
```
curl [url]
```

## Important Commands
- `wifi-menu`: connect to wifi
- `pacman -S wifi-menu`: install wifi-menu if need

## Steps & Commands
1. Prepare Arch bootable USB
- `dd bs=4M if=path/to/archlinux.iso of=/dev/sdx status=progress oflag=sync`: create bootable usb
2. Partition the disks
- `lsblk`: lsblk lists information about all or the specified block devices. The lsblk command reads the sysfs filesystem to gather information.
- `cgdisk`: text-mode partitioning tools
Sample layout:
  - BIOS with MBR
    Mount point	Partition	Partition type	Suggested size
    /mnt	/dev/sdX1	Linux	Remainder of the device
    [SWAP]	/dev/sdX2	Linux swap	More than 512 MiB
  - UEFI with GPT
    Mount point	Partition	Partition type	Suggested size
    /mnt/boot or /mnt/efi	/dev/sdX1	EFI system partition	256–512 MiB
    /mnt	/dev/sdX2	Linux x86-64 root (/)	Remainder of the device
    [SWAP]	/dev/sdX3	Linux swap	More than 512 MiB
- `mkfs.vfat -F32 /dev/sdXX`: format FAT32 for EFI partition
- `mkfs.ext4 /dev/sdXX`: format ext4 for basic linux partition
- `mkswap /dev/sdXX`: make swap partition
- `swapon /dev/sdXX`: enable swap on a partition
3. Install the base packages
- `mount /dev/sdaX /mnt`: mount cmd
- `mount /dev/sdaY /mnt/boot`: if your boot is UEFI, replace Y with you boot partition number
- `/etc/pacman.d/mirrorlist`: Uncomment mirrors you would like to use.
- `pacstrap /mnt base base-devel`: command to install arch into /mnt

4. Configure the system
- `genfstab -U /mnt >>/mnt/etc/fstab`: https`://wiki.archlinux.org/index.php/Fstab
- `arch-chroot /mnt`: changes the apparent root directory for the current running process and their children
- `useradd {username}`: add new user
- `passwd {username}`: set password for
- `pacman -S grub`: install grub
- `pacman -S os-prober`: if you have many os you need to install this
EFI
  - `grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB`: install grub bootloader, more info: https://wiki.archlinux.org/index.php/GRUB#Installation_2
BIOS with MBR
  - `grub-install --target=i386-pc /dev/sdX`: sdX is the disk, not the partion, ex: /dev/sda
- `grub-mkconfig -o /boot/grub/grub.cfg`: create grub boot config

