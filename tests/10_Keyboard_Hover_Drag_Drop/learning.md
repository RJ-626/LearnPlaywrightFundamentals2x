# Keyboard, Mouse (Up/Down), Hover & Drag-Drop in Playwright

## 1. Keyboard API (`page.keyboard`)

### Important Methods

| Method | Description |
|--------|-------------|
| `page.keyboard.press('key')` | Presses a key (down + up in a single call) |
| `page.keyboard.type('text')` | Types text character by character (focuses element behavior like a real user) |
| `page.keyboard.insertText('text')` | Inserts text directly (no key events, no modifiers) |
| `page.keyboard.down('key')` | Holds a key DOWN (does NOT release it) |
| `page.keyboard.up('key')` | RELEASES a key that was held down |

### Press vs Type vs InsertText

```ts
// press -> single key or shortcut
await page.keyboard.press('Enter');
await page.keyboard.press('Control+a');

// type -> full text, fires key events per character
await page.keyboard.type('Hello Playwright');

// insertText -> pastes-like, fast, no key events
await page.keyboard.insertText('Hello Playwright');
```

### down() / up() — for holding keys

```ts
// Hold Shift and type (results in uppercase)
await page.keyboard.down('Shift');
await page.keyboard.type('abc');   // -> ABC
await page.keyboard.up('Shift');

// Long key hold example: hold ArrowDown
await page.keyboard.down('ArrowDown');
await page.waitForTimeout(2000);
await page.keyboard.up('ArrowDown');
```

---

## 2. All Supported Keyboard Keys

### Modifier Keys
| Key Name |
|-----------|
| `Shift` (left/right: `ShiftLeft`, `ShiftRight`) |
| `Control` (left/right: `ControlLeft`, `ControlRight`) |
| `Alt` (left/right: `AltLeft`, `AltRight`) |
| `Meta` (left/right: `MetaLeft`, `MetaRight`) — Windows key / Command key |

### Navigation Keys
| Key Name |
|-----------|
| `ArrowUp` |
| `ArrowDown` |
| `ArrowLeft` |
| `ArrowRight` |
| `Home` |
| `End` |
| `PageUp` |
| `PageDown` |
| `Insert` |
| `Delete` |

### Editing / Action Keys
| Key Name |
|-----------|
| `Enter` |
| `Backspace` |
| `Tab` |
| `Escape` |
| `Space` |
| `Delete` |
| `CapsLock` |
| `ContextMenu` (right-click menu key) |
| `PrintScreen` |
| `ScrollLock` |
| `Pause` |

### Function Keys
| Key Name |
|-----------|
| `F1` – `F12` |

### Number Pad Keys
| Key Name |
|-----------|
| `Numpad0` – `Numpad9` |
| `NumpadAdd` (+) |
| `NumpadSubtract` (-) |
| `NumpadMultiply` (*) |
| `NumpadDivide` (/) |
| `NumpadDecimal` (.) |
| `NumpadEnter` |

### Media / Special Keys
| Key Name |
|-----------|
| `MediaPlayPause` |
| `MediaStop` |
| `MediaTrackNext` |
| `MediaTrackPrevious` |
| `VolumeUp` / `VolumeDown` / `VolumeMute` |
| `NumLock` |
| `Select` |
| `ZoomToggle` |

### Single Characters
- All letters: `a`–`z`, `A`–`Z`
- All digits: `0`–`9`
- Symbols can be typed via `type()`: `@`, `#`, `$` etc. (not via `press()`)

> Reference: [UI Events KeyboardEvent key Values spec](https://www.w3.org/TR/uievents-key/#keys-modifier)

---

## 3. Key Combinations (Shortcuts)

```ts
// Format: 'Modifier+key' or 'Modifier+Modifier+key'
await page.keyboard.press('Control+a');      // select all
await page.keyboard.press('Control+c');      // copy
await page.keyboard.press('Control+v');      // paste
await page.keyboard.press('Control+x');      // cut
await page.keyboard.press('Control+z');      // undo
await page.keyboard.press('Control+Shift+t');// reopen closed tab

// macOS examples
await page.keyboard.press('Meta+a');
await page.keyboard.press('Meta+Shift+3');   // screenshot on mac
```

---

## 4. Mouse API (`page.mouse`)

### All Mouse Methods

| Method | Description |
|--------|-------------|
| `page.mouse.up(button?)` | RELEASES a mouse button (finishes `down()`) |
| `page.mouse.down(button?)` | HOLDS a mouse button DOWN (does NOT release) |
| `page.mouse.click(x, y)` | Clicks at coordinates (down + up together) |
| `page.mouse.dblclick(x, y)` | Double-clicks at coordinates |
| `page.mouse.move(x, y)` | Moves mouse to coordinates |
| `page.mouse.wheel(deltaX, deltaY)` | Scrolls mouse wheel |

### Mouse Button Options
| Button |
|--------|
| `"left"` (default) |
| `"right"` |
| `"middle"` |

### down() / up() — holding mouse buttons

```ts
// Simple hold & release
await page.mouse.down();                          // default left button pressed & held
await page.mouse.move(400, 300);                  // drag while held
await page.mouse.up();                            // release

// Right button hold & release
await page.mouse.down({ button: 'right' });
await page.mouse.up({ button: 'right' });

// Middle button
await page.mouse.down({ button: 'middle' });
await page.mouse.up({ button: 'middle' });

// click() with options
await page.mouse.click(100, 200, { button: 'right', clickCount: 2 });
```

### move() with steps (smooth drag)

```ts
// steps: number of intermediate moves — higher = smoother/slower drag
await page.mouse.move(0, 0);
await page.mouse.move(400, 300, { steps: 10 });
```

---

## 5. Hover

```ts
// Locator-based (preferred)
await page.locator('#btnLogin').hover();

// With options
await page.locator('.menu-item').hover({
  modifiers: ['Shift'],           // hold keys while hovering
  force: true,                    // skip actionability checks
  position: { x: 10, y: 10 },     // hover at offset point
  timeout: 5000
});

// Mouse-based hover
await page.mouse.move(250, 150);
```

---

## 6. Drag & Drop

### Approach 1 — `dragTo()` (simple)

```ts
const source = page.locator('#draggable');
const target = page.locator('#droppable');
await source.dragTo(target);
```

### Approach 2 — Manual `down()` / `move()` / `up()` (more control)

```ts
const source = page.locator('#draggable');
const target = page.locator('#droppable');

await source.hover();
await page.mouse.down();
await target.hover();
await page.mouse.up();            // drop happens here
```

### Approach 3 — HTML5 Drag & Drop (dataTransfer event)

HTML5 drag needs `page.dispatchEvent` because mouse events alone don't trigger it:

```ts
await page.dispatchEvent('#draggable', 'dragstart', {
  dataTransfer: await page.evaluateHandle(() => new DataTransfer())
});
await page.dispatchEvent('#droppable', 'drop', {
  dataTransfer: await page.evaluateHandle(() => new DataTransfer())
});
```

---

## 7. Common Real-World Examples

```ts
// Select all text in an input and replace it
await page.fill('#search', 'old text');
await page.keyboard.press('Control+a');
await page.keyboard.type('new text');

// Submit a form with Enter
await page.keyboard.press('Enter');

// Dismiss a modal with Escape
await page.keyboard.press('Escape');

// Right-click (context menu)
await page.locator('#element').click({ button: 'right' });

// Double-click
await page.locator('#element').dblclick();

// Shift-click (select multiple items)
await page.locator('#item1').click();
await page.locator('#item5').click({ modifiers: ['Shift'] });

// Scroll down with mouse wheel
await page.mouse.wheel(0, 500);   // deltaX=0, deltaY=500
```

---

## Quick Summary

| Action | Method |
|--------|--------|
| Press & release a key | `keyboard.press()` |
| Hold a key | `keyboard.down()` |
| Release a key | `keyboard.up()` |
| Type a sentence | `keyboard.type()` |
| Paste-like insert | `keyboard.insertText()` |
| Click mouse | `mouse.click()` |
| Hold mouse button | `mouse.down()` |
| Release mouse button | `mouse.up()` |
| Hover | `locator.hover()` / `mouse.move()` |
| Drag & drop | `locator.dragTo()` / `down→move→up` |
