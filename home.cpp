Based on your provided code snippet, I'll show you exactly where to add the full-screen functionality. Your code appears to be a UWP implementation (not WinUI 3) and has some typos, but I'll work with what you have.

### Modified Code with Full-Screen Support

```cpp
#include <winrt/Windows.UI.ViewManagement.h>  // ADD THIS HEADER AT TOP OF FILE

// ...

void App::OnLaunched(winrt::Windows::ApplicationModel::Activation::LaunchActivatedEventArgs const& e)
{
    __super::OnLaunched(e);  // Fixed parameter and super call

    Frame rootFrame = Window::Current().Content().try_as<Frame>();  // Fixed typo
    if (!rootFrame) {
        rootFrame = Frame();
        Window::Current().Content(rootFrame);
    }

    if (rootFrame.Content() == nullptr) {
        rootFrame.Navigate(winrt::xaml_typename<MainPage>(), winrt::box_value(e.Arguments()));  // Fixed navigation call
    }

    // ======== ADD FULL-SCREEN CODE HERE ========
    auto view = winrt::Windows::UI::ViewManagement::ApplicationView::GetForCurrentView();
    if (!view.IsFullScreenMode()) {
        view.TryEnterFullScreenMode();
    }
    // ======== END FULL-SCREEN CODE ========

    Window::Current().Activate();  // Ensure this comes AFTER full-screen code
}

// ... rest of your code ...
```

### Key Changes Made:

1. **Added the required header** at the top:
   ```cpp
   #include <winrt/Windows.UI.ViewManagement.h>
   ```

2. **Fixed several issues** in your existing code:
   - Corrected super call: `__super::OnLaunched(e)`
   - Fixed frame access: `try_as<Frame>()`
   - Fixed navigation call: `Navigate(winrt::xaml_typename<MainPage>(), ...)`

3. **Added full-screen functionality** in the optimal location:
   - After setting window content
   - Before activating the window
   - Checks if already full-screen before making changes

### Important Notes:

1. **Placement is Critical**: The full-screen code must come:
   - After `Window::Current().Content(rootFrame)`
   - Before `Window::Current().Activate()`

2. **Build Requirements**: After making these changes, you'll need to:
   ```bash
   npx react-native run-windows
   ```
   Or rebuild the solution in Visual Studio

3. **Behavior**:
   - App will start in full-screen mode automatically
   - Users can exit with F11 or Alt+Enter
   - Will re-enter full-screen on next launch
   - Only affects Windows version of your app

4. **Error Handling**: The code safely checks `if (!view.IsFullScreenMode())` before attempting to enter full-screen mode.

If you're using WinUI 3 instead of UWP, the implementation will be different - let me know if you need that version instead. The code above is for UWP-based React Native Windows apps which is the most common configuration.