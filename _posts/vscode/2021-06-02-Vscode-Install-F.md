---
title: Install F# in VsCode and Run Demo Project
tags: VsCode F#
article_header:
  type: cover
---

# Install F# in VsCode and Run Demo Project
## Install Visual Studio Code and Ionide

#### step1.Install .Net SDK

Download `.Net` SDK in Windows 10 from [Download .NET 5.0 SDK (v5.0.300) - Windows x64 Installer (microsoft.com)](https://dotnet.microsoft.com/download/dotnet/thank-you/sdk-5.0.300-windows-x64-installer)

Then install `.Net`.

![image-20210602231044591](https://raw.githubusercontent.com/gggdttt/ImageBeds/master/image-20210602231044591.png)

#### step2.Install VsCode

Install [Visual Studio Code](https://code.visualstudio.com/download) for Windows.

#### step3.Install the Ionide package for VS Code.

Press `Ctrl+Shift+P` and enter the following to install the `Ionide` package for VSCode.

```shell
ext install Ionide-fsharp
```



##  Get Started with F# in Visual Studio Code

To create a new F# project, open a command line and create a new project with the .NET Core CLI(Input this command in `cmd` or `powershell`):

```shell
dotnet new console -lang "F#" -o FirstIonideProject
```

Once it completes, change directory to the project and open Visual Studio Code:

```shel
cd FirstIonideProject
code .
```

#### Possible Problem:

I find a strange problem when I began to create a new project:`error NU1100:unsolved net5.0 “FSharp.Core (>= 5.0.0)”`

Then I find a solution in [error NU1100: Unable to resolve 'FSharp.Core (>= 4.7.2)' for '.NETCoreApp,Version=v3.1'. ](https://github.com/dotnet/fsharp/issues/10147).

> 1. First check your file:
>
> ```
> C:\Users\vlonc_000\AppData\Roaming\NuGet\NuGet.Config
> ```
>
> 2. Check whether it contains an entry that looks like this:
>
> ```
> <?xml version="1.0" encoding="utf-8"?>
> <configuration>
>   <packageSources>
>     <add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
>   </packageSources>
> </configuration>
> ```
>
> 3. I found in my `NuGet.Config`, it contained nothing:
>
> ```
> <?xml version="1.0" encoding="utf-8"?>
> <configuration />
> ```
>
> Replacing the config file with the suggestion above seems to have fixed the issue.



### Configure F# interactive

First, ensure that .NET Core scripting is your default scripting environment:

1. Open the Visual Studio Code settings (**Code** > **Preferences** > **Settings**).
2. Search for the term **F# Script**.
3. Click the checkbox that says **FSharp: use SDK scripts**.

This is currently necessary due to some legacy behaviors in .NET Framework-based scripting that don't work with .NET Core scripting, and Ionide is currently striving for that backwards compatibility. In the future, .NET Core scripting will become the default.

