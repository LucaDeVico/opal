# OPAL tutorials: example files

Inputs, structures and computed results used by the OPAL tutorials, so that you can rerun the calculations and try the tools on the files the tutorials describe. The page that explains each file is the Example files page of the tutorials.

## What the folders hold

- `inputs/`: OpenMolcas input files.
- `files/`: structures (`.xyz`) and computed results (`.h5`, Molden files).
- `zips/`: one ZIP per chapter, holding that chapter's inputs and `.xyz` files in one folder. Computed results are not in the ZIPs; download them one by one.

## Where the results came from

OpenMolcas build: v26.10-164-g3bb7bcd61-dirty (the version string stored inside the result files; the trailing word says the source tree had local changes).

The method, active space and basis set were chosen so that the calculations run quickly; the results are for tutorial purposes and may differ from published values.

## Rerunning an input

Put the input and the `.xyz` files it names in one folder, go to that folder and run `pymolcas <name>.input -o <name>.out`. An input names its structure file in its `Coord` line; if you rename a file, change that line too.

## Files

| File | Folder | What it is | Size | Chapters |
|---|---|---|---|---|
| `diazene_trans.input` | inputs | Input of the small Colab example: trans-diazene, ANO-S-VDZP, no symmetry, state-averaged CASSCF over 5 roots, RMS-CASPT2, RASSI | 402 bytes | chapter-05 |
| `water.xyz` | inputs | Water, three atoms (a standard geometry, typed from the CSFsCalc page); the small molecule of the CSFsCalc, MolViz and Colab examples, not part of the azobenzene case study | 86 bytes |  |
| `azobenzene_trans_start.xyz` | files | trans-azobenzene, planar force-field structure from MolBuild; the structure the SCF and the first RAS step were run on | 1.1 kB | chapter-02, chapter-03, chapter-04 |
| `azobenzene_cis_start.xyz` | files | cis-azobenzene, force-field structure; the starting structure of the cis optimization | 1.2 kB | chapter-02, chapter-03 |
| `azobenzene_trans_scf.h5` | files | Orbitals of the SCF step on the trans start structure (azobenzene_trans_start.xyz), for choosing the active space | 4.6 MB | chapter-06 |
| `azobenzene_trans_ras_9_0_7.input` | inputs | First RAS step (9/0/7 orbitals, 2 holes, 2 electrons), run on the trans start structure; it reads the SCF orbitals and the structure under the names they had when it was run, not the names of this folder | 492 bytes | chapter-06 |
| `azobenzene_trans_ras_9_0_7.h5` | files | Result of the first RAS step on the trans start structure, for reordering the active orbitals by occupation | 5.1 MB | chapter-06 |
| `azobenzene_trans_ras_5_5_6.input` | inputs | Second RAS step (5/5/6 orbitals, 2 holes, 2 electrons, 5 roots) followed by RASSI and RMS-CASPT2, run at the trans ground-state minimum (azobenzene_trans_s0_min.xyz); it reads its structure and starting orbitals under the names they had when it was run, not the names of this folder | 441 bytes | chapter-06, chapter-07 |
| `azobenzene_trans_ras_5_5_6.h5` | files | Result of the second RAS step, at the trans ground-state minimum | 6.0 MB | chapter-06 |
| `azobenzene_trans_rassi.h5` | files | RASSI file of the five states at the trans ground-state minimum, for transition densities and the spectrum (21 MB, the largest file of the set) | 20.2 MB | chapter-07 |
| `azobenzene_trans_s0_opt.slapaf.h5` | files | Optimization of the trans ground-state minimum, started from the trans start structure | 285.7 kB | chapter-08 |
| `azobenzene_trans_s0_opt.geo.molden` | files | The same optimization as a Molden geometry series | 32.2 kB | chapter-08 |
| `azobenzene_trans_s1_opt.slapaf.h5` | files | Optimization of the excited-state (S1) minimum of trans-azobenzene | 454.1 kB | chapter-08 |
| `azobenzene_trans_bright_min.slapaf.h5` | files | Optimization of the minimum of the bright excited state of trans-azobenzene, with state tracking on (37 iterations); read from the file: the followed state starts as root 5 and is root 3 at the last iteration | 728.7 kB | chapter-07, chapter-08, chapter-09 |
| `azobenzene_trans_bright_min.geo.molden` | files | The same optimization of the bright-state minimum as a Molden geometry series | 87.2 kB | chapter-07, chapter-08, chapter-09 |
| `azobenzene_trans_bright_min.xyz` | files | The structure of the bright-state minimum of trans-azobenzene | 1.0 kB | chapter-07, chapter-08, chapter-09 |
| `azobenzene_trans_s0_min.xyz` | files | trans ground-state minimum | 1.0 kB | chapter-09 |
| `azobenzene_trans_s1_min.xyz` | files | trans excited-state minimum | 1.0 kB | chapter-09 |
| `azobenzene_cis_s0_min.xyz` | files | cis ground-state structure from the optimization (no Hessian was computed, so it is not established that it is a minimum) | 1.0 kB | chapter-09 |
| `azobenzene_ts_guess.xyz` | files | Starting guess for the cis to trans transition-state search | 1.0 kB | chapter-10 |
| `azobenzene_ts_search.slapaf.h5` | files | Transition-state search (the search only; it holds no IRC) | 268.6 kB | chapter-10 |
| `azobenzene_ts_freq.molden` | files | Frequencies at the transition state (the imaginary mode) | 113.8 kB | chapter-10 |
| `azobenzene_ci_search.slapaf.h5` | files | Search for the S1/S0 conical intersection | 525.2 kB | chapter-11 |

## Licence

The data files are licensed under the Creative Commons Attribution 4.0 International licence (CC BY 4.0): https://creativecommons.org/licenses/by/4.0/
