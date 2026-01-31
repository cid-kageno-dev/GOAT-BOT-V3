# ⚔️ CID KAGENO - Messenger Bot 

![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Platform](https://img.shields.io/badge/Platform-Render-blue)
![Library](https://img.shields.io/badge/Library-FCA-orange)

> "I am Atomic."  
> High-performance Messenger bot optimized for Render, featuring a Shadow Garden theme.

---

## ⚡ Features

* **Render Optimized:** Auto-login & keep-alive support.  
* **Anti-Ban Logic:** Windows User-Agent spoofing.  
* **Shadow Garden Theme:** Custom ASCII startup screen.  
* **Command System:** Modular GoatBot V2 structure.  
* **Auto-Restart:** Recovers from temporary Facebook disconnects.  

---

## 🚀 Supported Libraries

* **fca-neokex**  
* **biar-fca**  

You can choose either as the core Facebook automation library.

---

## 🛠️ Installation

### **Prerequisites**
* Facebook bot account  
* GitHub account  
* Render.com account (Free Tier works)

### **Deploy to Render**
1. Fork the repository.  
2. Create a Web Service on Render and connect your GitHub repo.  
3. Settings:
   * **Runtime:** Node  
   * **Build Command:** `npm install`  
   * **Start Command:** `npm start`  
   * Node version >= 18 (set in `package.json` engines)

---

## 🍪 Cookies Setup
1. Use **Cookie-Editor** extension.  
2. Export your bot account cookies as JSON.  
3. Save as `account.txt` in the project root (keep private).  

---

## 📝 Credits

* **Original Core:** GoatBot V2 by NTKhang  
* **Libraries:** [fca-neokex](https://github.com/KhangGia1810/fca-neokex), biar-fca  
* **Modifications:** Cid Kageno (Shadow Garden Edition)
