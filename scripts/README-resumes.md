# Résumé sources

The two downloadable PDFs use `src/configs/profile.ts` as the source for roles, tasks and tools. The visual version also uses the five exported JPEG backgrounds from the `stable` page of the [original Figma CV](https://www.figma.com/design/LQ6AT13hdUIiozZAi3Vyga/CV?node-id=1437-574).

To regenerate after editing the profile, run `node scripts/export_resume_data.mjs`, then run `python3 scripts/build_simple_resume.py` and `python3 scripts/build_modern_resume.py` with ReportLab installed. The simple PDF is also copied to `public/resume.pdf` to keep old direct links current. Refresh the two preview images after changing the cover pages.

The Figma backgrounds are exported artwork; the modern résumé's current text and focus cards are drawn over them by `build_modern_resume.py`. The source backgrounds remain available for later adjustments to the layout.
