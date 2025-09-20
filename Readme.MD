# 🔐 Codebreaker

A smart web-based implementation of the classic Mastermind puzzle game. The computer suggests 4-digit codes and uses your feedback to solve any code efficiently.

## 🎮 How to Play

1. The computer suggests a 4-digit code (starting with 1357)
2. Enter your feedback:
   - **Red hits**: Right digit, wrong position
   - **Green hits**: Right digit, right position  
3. Click "Solve/Next" for the computer's next guess
4. Repeat until solved!

## 🌟 Features

- **Smart Algorithm**: Efficient code elimination and information theory
- **Multi-language**: German, English, French
- **Clean Design**: Modern, responsive interface
- **No Dependencies**: Pure HTML, CSS, JavaScript

## 📁 Project Structure

```
codebreaker/
├── index.html    # Game interface
├── style.css     # Styling
└── script.js       # Game logic & translations
```

## 🎯 Game Algorithm

The solver uses two strategies:
- **Elimination**: Removes impossible codes based on feedback
- **Information Gain**: When elimination stalls, maximizes information from guesses

Valid codes: 4-digit numbers without zeros or repeated digits (1234, 5678, etc.)

## 🌍 Languages

- 🇩🇪 **Deutsch** (Default)
- 🇺🇸 **English** 
- 🇫🇷 **Français**

## 🎨 Screenshots

The game features a clean, modern interface with:
- Interactive feedback buttons
- Real-time counter updates
- Visual selection states
- Responsive mobile design

## 🔧 Customization

### Adding New Languages
Edit the `translations` object in `script.js`:

```javascript
const translations = {
    // existing languages...
    es: {
        title: "🔐 Codebreaker",
        instructionsTitle: "Cómo jugar:",
        // add all translation keys...
    }
};
```

### Styling Changes
Modify `style.css` for different colors, fonts, or layouts.

### Game Logic
The core algorithm is in the `CodebreakerGame` class in `script.js`.

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Credits

- Original concept: Mastermind by Mordecai Meirowitz
- Algorithm inspired by information theory and constraint satisfaction

---

**Happy Code Breaking! 🧩**

*Try to stump the computer with your trickiest codes!*
