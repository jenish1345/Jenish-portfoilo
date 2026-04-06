# How to Add Your Profile Photo

## Quick Steps:

1. **Save the image from chat:**
   - Right-click the image in the chat
   - Click "Save Image As..."
   - Save it as `profile-photo.jpg` to your Downloads folder

2. **Move it to the project:**
   ```bash
   # Copy from Downloads to project
   cp ~/Downloads/profile-photo.jpg ~/Jenish-portfoilo/public/profile-photo.jpg
   ```

3. **Commit and push:**
   ```bash
   cd ~/Jenish-portfoilo
   git add public/profile-photo.jpg
   git commit -m "Add profile photo"
   git push origin main
   ```

## Alternative: If the file has a different name

If you saved it with a different name, just replace `profile-photo.jpg` with the actual filename:

```bash
cp ~/Downloads/YOUR_FILENAME.jpg ~/Jenish-portfoilo/public/profile-photo.jpg
cd ~/Jenish-portfoilo
git add public/profile-photo.jpg
git commit -m "Add profile photo"
git push origin main
```

That's it! Your animated portfolio will be live in 1-2 minutes! 🚀
