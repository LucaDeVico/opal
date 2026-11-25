# OPAL — Orbitals, Plotting, Analysis and Layout

OPAL is a small suite of browser-based tools for working with OpenMolcas:
building molecules, looking at orbitals and densities, inspecting RASSI results,
following optimisation and reaction paths, comparing geometries and planning
RASSCF calculations. This site, <https://lucadevico.github.io/opal/>, is the
online copy of the suite. Everything runs in your browser. The files you open
stay on your computer: they are read locally and nothing is uploaded.

## What this site holds

- **The launcher**, `index.html`: the start page, with a card for each tool.
- **The eight tools**, one HTML file each, complete on its own:

  | File | Tool | What it does |
  |---|---|---|
  | `molbuild.html` | MolBuild | Draw a molecule in 2D and get 3D coordinates; reads and writes XYZ files. |
  | `molviz.html` | MolViz | Ball-and-stick viewer for XYZ, Molden and HDF5 geometries, with measurements and image and animation export. |
  | `orbviz.html` | OrbViz | Molecular orbitals, electron densities and density differences from HDF5 and Molden files; `ALTEr` blocks for the active space and for ordering by occupation. |
  | `pathvibviz.html` | PathVibViz | Optimisation, IRC and MEP paths, conical intersections and vibrations (work in progress). |
  | `rassiviz.html` | RassiViz | RASSI states, transition dipole moments, transition densities and absorption spectra. |
  | `geodiff.html` | GeoDiff | Compare two structures: RMSD, superposition, ranked bond, angle and dihedral differences. |
  | `intcoords.html` | IntCoords | Build the SLAPAF internal-coordinates block for a transition-state search. |
  | `csfscalc.html` | CSFsCalc | Count CSFs and determinants for a RASSCF active space, with a memory estimate. |

- **The tutorials**, in the `tutorials/` folder (start at
  <https://lucadevico.github.io/opal/tutorials/>): step-by-step guides that use the tools.
- **An offline layer** (a web app manifest, a service worker and icons) that lets
  you install OPAL on a tablet or a computer and use it without a network. It is
  being added; until it is there, the pages below work as ordinary web pages.

## Using it in a browser

Open <https://lucadevico.github.io/opal/> and pick a tool. To load a
calculation, use the tool's file button or drop the file onto the window. Each
tool can also be opened directly by its file name, for example
`https://lucadevico.github.io/opal/orbviz.html`. The first toolbar item of
every tool, "OPAL", leads back to the launcher.

You need a current Chrome, Edge, Firefox or Safari (Safari 14.1 or later on
macOS, iPadOS and iOS). The 3D tools need WebGL, which all of these provide.
An internet connection is needed only to load the page itself; once a tool is
open, working with your files needs no network.

## Using it as an installed app

Once the offline layer is published, you can install OPAL so that it opens like
an application and works offline:

- **iPad or iPhone (Safari):** open the launcher, tap Share, then *Add to Home
  Screen*.
- **Chrome or Edge on a computer or Android:** use the install icon in the
  address bar, or the browser menu.

The installed copy is kept up to date by the browser. When a newer version has
been published, the launcher shows a message; the new version is used after you
accept it, never in the middle of your work. The installed app handles only the
launcher and the tools; the tutorials are always read from the network.

Your own data files are never stored by the app: you choose them each time with
the file button, as in a browser tab.

## Working from a downloaded copy

You do not need this site at all. Each tool is a single HTML file, and it works
if you save it and double-click it, with no server and no network. The
launcher links to the tools by file name, so keep the files in one folder. The
copy of the suite distributed with OpenMolcas (folder `Tools/OPAL`) is the same
set of files.

## Where the source lives, and how to report a problem

The files on this site are published copies. They are developed elsewhere,
together with a test harness that checks them in a simulated browser before
each update, so a change made to a file here would be lost at the next update.
The source is the `Tools/OPAL` folder of the OpenMolcas repository on GitLab.
To report a problem or propose a change, please open an issue there or mention
the author (@luca.devico) in a merge request.

## Third-party code

The 3D tools include a copy of [three.js](https://threejs.org) r128, which is
distributed under the MIT licence. Its licence notice is kept inside each file.

## Licence

OPAL is part of OpenMolcas and is distributed under the same licence: the GNU
Lesser General Public License, v. 2.1. For more details see the full text of
the license in the file `LICENSE` at the top of OpenMolcas or in
<http://www.gnu.org/licenses/>.

## Author

Luca De Vico, Università degli Studi di Siena.
