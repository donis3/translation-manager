# Translation Manager

This react application is developed for editing json translation files. This is purely a frontend application and saves all data in the users browser.

## What it does

Translation Manager is basically a json editor. You can load a reference json and a target json. All translation keys will be based on the reference file. Then the target file will be scanned for matching keys. Each matching key will get its value from target file. Unmatching target file keys will be disregarded. This way, you get a synced version of the target file with the reference file. 

Target file is optional and you can start editing with only a reference file. All translation values will be blank.

## Help translate this app

The application interface is in English and Turkish. If you would like to contribute by translating to other languages, download the english [translation.json](https://raw.githubusercontent.com/donis3/translation-manager/master/public/locales/en/translation.json). You can use this app to help edit this file :>


### MIT License

Copyright (c) 2022 Deniz Özkan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.