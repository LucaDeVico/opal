# OPAL probe

A throw-away page for the iPad. It is **not** the OPAL app and carries no tool. It
answers three questions before any further work on an installable OPAL:

1. Does the file picker work in a page installed on the home screen?
2. Does sharing a saved file work from such a page after a long task?
3. Does the cache of an installed page survive two weeks of normal use?

It lives in its own sub-folder, `probe/`, of the window, so its service worker
cannot reach any tool. It is published to the window only, never to the dock.

## Install it on the iPad

1. Publish the window as usual (`./scripts/publish.sh --window`), commit and push it,
   and wait for the page to update.
2. On the iPad, open **Safari** (not another browser) at the window address followed by
   `/probe/`.
3. Tap the page's Share button, then **Add to Home Screen**, and name it "OPAL probe".
4. Close Safari. Open the new icon on the home screen. The first line of the page must
   say "Running as an installed app". If it says "browser tab", the install did not take.

## What to try, in order

Do all of it from the installed icon, not from Safari.

1. **Cache.** The last section shows when the cache was filled. Write down that time.
2. **File picker.** Tap "Choose file" and pick a file from Files (an `.h5` file is the
   best test). Write down whether the picker opened, whether control came back to the
   page, and whether the name and size shown are right.
3. **Short wait, then share.** Leave 20 seconds, tap "Start the wait", wait for "done",
   then tap "Share the saved file" and save `opal-probe.txt` to Files. Write down the
   result line and what the Files app shows (name, one item or two).
4. **Long wait, then share.** Set 120 seconds and repeat. This is the case that matters:
   the tap that starts the wait is long gone when the file is ready. Write down the
   result line.
5. **Share by itself.** Tick "also try to share by itself", run a 20 second wait and leave
   the page alone. This is expected to fail; write down the error text.
6. **Airplane mode.** Turn it on, close the app completely (swipe it away), open it again.
   It must open and still show the same "Cache filled" time.

The log at the bottom of the page repeats every result with its time. A screenshot of
it is enough to write down.

## When to look again

Use the iPad normally for **two weeks** without opening the probe. Then, in airplane
mode, open it from the home screen. It passes if it opens and the "Cache filled" time is
still the one you wrote down. If it is missing, or it needs the network, the cache did not
survive, and that is the result.

## What to report

For each numbered step above: worked, failed, or odd, with the text the page showed. Then
set the checkpoint `PW` to `OK` only if steps 2, 3, 4 and 6 worked and the two-week check
passed.
