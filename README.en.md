# Studio de plugins (Plugin Studio)

Build your own small apps without writing code: pick a template, fill in a form, and the app works straight away. Each creation can be pinned as a widget on the NeoDex home page, send a daily reminder and be shared with a code.

*Version française : [README.md](README.md)*

## Create

**+ New**, then pick a template. The form sits next to the preview, which updates with every letter you type. Each creation has its own title and colour, and is kept in **My creations**.

## The eleven templates

- **Flashcards**: one card per line, "front | back". You see the front, **Show answer**, then **I knew it** or **Review again**. It uses the Leitner box system: a known card comes back 2, 4, 8, 16… days later (64 days at most); a missed card comes back the same day and starts over. **Review everything anyway** starts a free review of all the cards.
- **Daily routine**: one task per line. The list unticks itself every morning; the streak counts the days when everything was ticked.
- **Step timer**: steps with their duration (work, break…) and a number of rounds. Steps follow each other with a beep; you see the current step, the time left and the next one. **Pause**, **Skip**, **Restart**; finished sessions are counted.
- **Number tracker**: one value per day (sleep, weight, steps…) with its unit. A chart of the last days, the latest value, the 7-day average and a goal line if you set one.
- **Random draw**: one choice per line, a wheel that spins and stops on one of them, with the last 10 draws. Optionally, a drawn choice is removed from the wheel (**Put all choices back** restores them).
- **Countdowns**: events with their date; the days left before each one. A birthday can come back every year.
- **Quiz**: multiple-choice questions (at least two answers), the right answer shown when you get it wrong, a score and a best score.
- **Counter**: counters with **+** and **−**, a step and a goal with a progress bar.
- **Habit tracker**: one habit per line, the last 7 days as checkboxes and a streak for each.
- **Checklist**: a list that keeps what you ticked (shopping, packing, to-do), with **Untick all**.
- **Links page**: a grid of buttons to your favourite sites.

## For each creation

- 📌 **Pin**: its summary appears in a widget on the NeoDex home page (for example "3 card(s) to review" or your counters). One creation is pinned at a time.
- **Daily reminder** at the time you choose: a NeoDex notification, sent even when the studio tab is closed.
- ⇪ **Share**: a code to send to a friend. They paste it into their studio (**+ New → Import a share**) and get the creation, without your scores, streaks or values.
- ⧉ **Duplicate** and ✕ **Delete**.

## Data and sync

Your creations and their scores, streaks and values are stored by NeoDex, backed up and synced between your PCs when sync is on.

## Install

In NeoDex: **NeoStore → Discover → Studio de plugins → Install**.

Building a plugin: see the [NeoDex SDK](https://github.com/NDesumeur/neodex-sdk).
