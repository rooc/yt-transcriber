---
title: "¿Qué es un RC **Release Candidate** de Linux? (English Translation)"
source: "https://www.youtube.com/watch?v=bpXqmMk-eLM"
---

**0:08** If you're approaching the world of Linux, you've probably already seen the term "release candidate" in some email, kernel announcement, or administrator forum.
**0:20** It usually comes with a very clear warning: "Don't put it into production until it's been thoroughly reviewed." And especially in the case of Linux 7.0,
**0:28** These RCs have been very much in the spotlight because Linus Torvalds hasn't held back in saying that they've kept him in a constant state of anxiety.
**0:35** "Release candidate" in Spanish would be something like a "candidate for launch." In the Linux ecosystem, an RC is a kernel version that's almost ready to be the official version, but is still in internal testing phase.
**0:51** It's like saying the building is constructed, but they're still doing the final security, plumbing, and electrical inspections before enabling the building for people to live there.
**1:01** In the case of Linux, the RC isn't something from your Fedora or your distribution, but from the operating system's core. The kernel that makes Linux work under servers, desktop computers, mobiles, systems, and even supercomputers.
**1:18** It's the central engine of the entire system. The typical Linux process works like this:
**1:22** First, the merge window opens—a few weeks in which strong changes are accepted: new drivers, subsystem rewrites, support for new hardware, major functions, etc.
**1:36** When that window closes, Linus Torvalds launches Linux 7.0.0 RC1, for example, the first release candidate of the cycle. From there, every week comes RC2, RC3, RC4, until the kernel is considered stable enough to be called Linux 7.0 stable version.
**1:56** In practice, if you see Linux 7.0.0 RC1, it means it's not the definitive version yet, but advanced enough for experts, testers, and distributions to put it to the test in laboratory environments, on test servers, on development machines to see how it behaves with different hardware and configurations.
**2:17** And this is where Linus's nervousness comes in with the size of certain RCs.
**2:22** In the Linux kernel, every line of code that enters affects millions of machines, servers, datacenters, PCs, routers, cameras. That's why if an RC arrives late with many big changes or if delicate patches are put into critical subsystems, the risk of failure multiplies.
**2:38** In the case of Linux 7.0 RC2, Linus commented that he was especially nervous about the size of this one. It arrived with more problems than usual, touching sensitive parts of the kernel, where a failure can translate into crashes, data loss, or performance drops.
**2:55** For him, that volume of changes so large, so close to launch, means the development cycle is deviating from the calm he would normally desire.
**3:03** With RC3 and RC4, things didn't improve much. The 7.0 RC4, for example, brought important changes to the scheduler, to the memory subsystem, and to GPU drivers, correcting errors that could make the system hang under certain process load conditions.
**3:21** For Linus, that a mid-cycle RC was still bringing such serious changes was a signal, again, that the system wasn't going as it should.
**3:30** But with RC5 the rhythm changed. The number of changes was reduced. They focused more on bug corrections, mappings, and hardware details, leaving aside the big rewrites.
**3:40** Linus took this as a good sign and said something like things were calming down. Even so, RC6 brought certain problems and new patches again, which showed that the Linux 7.0.0 cycle has been more eventful than usual with many tests, many corrections, and many eyes on the timing.
**3:58** Regarding the key question, when does Linux 7.0 arrive and how many RCs are needed? The reality is that there's no fixed number, it's not a target of 7 RCs and it closes no matter what. Everything depends on how the code stabilizes.
**4:11** It's normal for between 6 and 8 RCs to pass, for example, from 7.0 RC1 to 7.0.0 RC8 before Linus marks the version as stable.
**4:20** In the case of Linux 7.0, the planned calendar indicated that the stable version would arrive in mid-April 2026 after a development cycle of about 10 weeks from RC1.
**4:31** Some specific dates being considered were April 5, 12, or 19, 2026, depending on whether the process closed with seven RCs or extended with some extra ones.
**4:42** If no serious setbacks appear, the final version should be available on those days, and those are the dates that many distributions like Ubuntu 26.04 LTS and Fedora 44 are looking at to integrate Linux 7.0 as the base kernel.
**4:59** And why all this fuss, nervousness, and prominence? Well because under the RC layer, Linux 7.0.0 is one of the most powerful updates of the last decade with support from giants like Google, Intel, and even Microsoft, which no longer sees Linux as an enemy, but as an ally.
**5:15** So although RCs can make Linus's hair stand on end, they're also the guarantee that the kernel that later arrives at your server or PC has gone through an intense round of tests designed precisely so you don't have to jump from the chaos of Windows 11 to new chaos in an unstable kernel.
**5:36** If you liked this video, give it a like, subscribe, and any questions or suggestions you can leave in the comments box. See you in the next video.
