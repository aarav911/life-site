# LifeSite

A **local-first life management system** built for personal use.

![Flowchart](photos(bs)/flowchart.png)
This is how the process will go on for the future. Basically, i will find problems in my life: solve them, and then operationalize them in this app. Simple. Life long project. 



---

# Motivation

Most modern productivity apps:

• store data in proprietary cloud systems
• require subscriptions
• lock users into platforms
• make exporting or owning data difficult

I wanted something different:

* full control of data
* works across laptop and phone
* no recurring costs
* completely customizable
* local-first architecture

---

# The Core Problem

The requirement was:

```text
One app
Two devices
Shared state
No cloud
```

The challenge was that the devices involved were:

```
Linux Laptop
iPhone
```

iOS introduces several restrictions:

* browsers cannot write directly to the filesystem
* PWAs cannot access arbitrary local directories
* iOS apps require signing and certificates
* Apple limits sideloaded apps to 7 days

So a significant part of this project involved **working around platform restrictions**, especially on iOS.

---

# Initial Architecture

The project started as a standard web application.

Frontend stack:

* React
* Vite
* TypeScript

This provided a flexible UI layer that can run both on desktop and mobile.

---

# Laptop Storage Solution

Browsers cannot write directly to disk.

While IndexedDB was an option, I rejected it because:

```
IndexedDB = browser-owned storage
```

I wanted:

```
filesystem-owned storage
```

So I implemented a small backend server.

Stack:

* Node.js
* Express
* Multer

Flow:

```
React UI
   ↓
HTTP upload
   ↓
Node server
   ↓
write file to local directory
```

This solved the laptop side.

---

# iPhone Storage Problem

The next challenge was enabling the **same functionality on the iPhone**.

Constraints:

* PWAs cannot write to arbitrary filesystem directories
* Safari storage is sandboxed
* Syncthing requires access to real folders

Therefore the solution required a **native wrapper**.

---

# Native iOS Wrapper

The React application was wrapped using **Capacitor**.

Capacitor provides access to native APIs including the filesystem.

This allowed the app to write files to:

```
Documents/LifeSiteFolder
```

inside the app sandbox.

This directory can then be accessed by other apps via the iOS Files interface.

---

# iOS Build Pipeline

Since I do not own a Mac, the iOS build process runs through **GitHub Actions**.

Pipeline:

```
push code
     ↓
GitHub Actions (macOS runner)
     ↓
build iOS project
     ↓
generate .ipa
     ↓
download artifact
```

---

# Installing the App

Apple restricts sideloading.

To install the application without paying for an Apple developer account:

1. Install **SideStore**
2. Use **iloader** to bootstrap SideStore
3. Install the generated `.ipa` through SideStore
4. SideStore refreshes the certificate every 7 days

This was easily the most painful part of the project.

---

# Synchronizing Devices

The core requirement was shared state between devices.

The solution is **Syncthing**.

Architecture:

```
LifeSite App (phone)
        ↓
iOS filesystem
        ↓
Synctrain (Syncthing client)
        ↓
Syncthing
        ↓
Laptop folder
```

This sync is **bidirectional**.

Meaning:

```
phone → laptop
laptop → phone
```

Files added on either device propagate to the other.

---

# Final System Architecture

```
           React UI
              │
      ┌───────┴────────┐
      │                │
 Desktop Browser    iPhone App
      │                │
 Node Server       Capacitor FS
      │                │
 Laptop Folder    iOS Documents
        \              /
         \            /
          \          /
           Syncthing
```

This creates a **shared distributed folder** between devices.

---

# What This Achieves

The system now provides:

* a custom personal app
* local filesystem ownership
* peer-to-peer sync
* zero SaaS dependency
* cross-device shared state

This unintentionally follows a philosophy known as:

**Local-First Software**

A movement focused on:

* user-owned data
* offline-first design
* peer-to-peer sync
* resilience to cloud outages

It was interesting to discover that the architecture arrived at independently aligns with this philosophy.

---

# Current Status (v1)

Working prototype.

Capabilities:

* upload files from desktop
* upload files from phone
* local filesystem storage
* bidirectional sync
* iOS wrapper
* automated iOS builds
* sideloaded installation

This is the **first fully working version of the system**.

---

# Next Phase

The next stage focuses on turning the prototype into a real application.

Areas to develop:

### UI/UX

* clean interface
* light mode / dark mode
* responsive layout

### Core Features

* file browser
* note editor
* task management
* idea capture
* knowledge indexing

### Data Model

Designing structured storage for:

```
notes
tasks
ideas
files
links
```

Likely using JSON-based metadata.

---

# Learning Goals

This project is also a learning vehicle.

Areas to explore deeper:

* local-first architecture
* distributed sync
* UI/UX design
* data modeling
* TypeScript
* React architecture

---

# Future Possibilities

Potential improvements:

* offline search index
* tagging system
* graph of knowledge
* encrypted storage
* collaborative editing

---

# Community

Since this architecture aligns with **local-first software**, I plan to explore that ecosystem and get feedback on the design.

Possible communities include:

* Local First Web
* Ink & Switch research
* Automerge / CRDT communities

It will be interesting to see how this architecture holds up under scrutiny.

---

# Final Note

Despite the friction caused by iOS restrictions and Apple’s ecosystem, the system now works.

Two devices
Shared state
Local ownership of data

The first real version of **LifeSite** exists.


## Personal notes (March 15, 2026)
The vision is to make it a proper life management app, perfectly custom tailered to my specific needs, and with absolutely 0 cost (even though i had to buy a usb convertor :(). The problem was that i wanted to use that app on both my laptop and my phone. And i happened to be dumb enough to own an iphone. SO, i had to do a lot more. I started off with a vite project and made the UI in react. now, it turns out that the browser cant write files locally (unless you use IndexDB, which i didnt want to do, because it was still technically the browsers data and not mine). So, then i wrote a ts server to get the files sent by the UI, and that server has access to the directory and thus it can write to it. That was one part: the app was working from the laptop side. Now, i wanted to do the exact same thing on my iphone as well. So, i had to go through the route of wrapping the react using capacitor, then using github actions to build the .ipa file, and then use iloader to install sidestore which then inturn allow my app to be install and be available for more than 7 days. I HATE APPLE. The reason why all of this was done was because i wanted the apps to have the same state, and thus the same data. The only that could have happened was if i had the data in specific folders on both my devices and used a magical tool called syncthing to sync them. Inorder for me to read and write data from a local directory on my iphone i had to have a native app. A PWA would not be allows to read or write to the local directory. Thats why i had to go through all the pain. But, its worth it: because now i have a system that somewhat reliably has the same app on two different devices, has access to the same state/data and can manipulate it. So, we have colaboration, and we have localized data with full ownership. 

Turns out that by doing that i had stumbled across something people call Local-first Software, and my architecture happens to just follow the exact philosophy as they do. Cool, to see that i am not the only one insane here. 

Now, the task is to learn these technologies a bit more deeply (over time), and actually design the site. So, things like eactly what do i want on the site, what features or functionalites will actually manage and organize my life, learning some UIUX and making it beautiful (light mode and dark mode), and the data model, and the specifics of those kinds of stuff. 

I should also probably find some local first community and join it, and ask people to roast my architecture. Maybe ill redesign it. Who knows. All i know for now, is that this shit works (atleast for my devices), and that i succesfully made my first real software project(atleast v1). 
