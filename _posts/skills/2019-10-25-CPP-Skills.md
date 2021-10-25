---
title: CPP Skills
tags: CPP, Skills
article_header:
  type: cover
date:   2019-10-22 16:01:40 +0800
key: CPP-Skills
aside:
  toc: true
category: [Note,CPP]
---

## Compile

1.  Compile file:

   ``` shell
    gcc {FileName} -o {outputFile}
   ```

2. Compile multi file:

   If all the `cpp` file is in the same folder,  use:

   ``` shell
    gcc *.cpp -o {outputFile}
   ```

   If they are not under the same folder, try:

   ```shell
   gcc {FileName1} {FileName2} ... {FileNameN} -o {outputFile}
   ```

   Or writing a `makefile` is  also a good choice. [Guidance](https://seisman.github.io/how-to-write-makefile/introduction.html#id1)

