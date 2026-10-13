import json
from html import escape
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    CondPageBreak,
    HRFlowable,
    Image,
    Paragraph,
    PageBreak,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

SITE = Path(__file__).resolve().parents[1]
DATA = json.loads((SITE / 'scripts/resume-data.json').read_text())
OUTPUT = SITE / 'public'
BLUE = colors.HexColor('#137EFF')
NAVY = colors.HexColor('#173C73')
INK = colors.HexColor('#172B4A')
MUTED = colors.HexColor('#53657A')
PALE = colors.HexColor('#E9F3FF')
PAGE_W, PAGE_H = A4

pdfmetrics.registerFont(TTFont('ArialResume', '/System/Library/Fonts/Supplemental/Arial.ttf'))
pdfmetrics.registerFont(TTFont('ArialResumeBold', '/System/Library/Fonts/Supplemental/Arial Bold.ttf'))
pdfmetrics.registerFontFamily('ArialResume', normal='ArialResume', bold='ArialResumeBold')


def clean(value):
    return escape(value.replace('–', '-').replace('—', '-').replace('‑', '-'))


def styles(modern):
    small = 8.15 if modern else 8.3
    return {
        'body': ParagraphStyle('body', fontName='ArialResume', fontSize=small, leading=11.3, textColor=INK, spaceAfter=3),
        'bullet': ParagraphStyle('bullet', fontName='ArialResume', fontSize=small, leading=11.2, textColor=INK, leftIndent=12, firstLineIndent=-8, spaceAfter=2),
        'section': ParagraphStyle('section', fontName='ArialResumeBold', fontSize=11.7 if modern else 10.2, leading=14, textColor=BLUE if modern else INK, spaceBefore=13, spaceAfter=5),
        'role': ParagraphStyle('role', fontName='ArialResumeBold', fontSize=9.8 if modern else 9.2, leading=12, textColor=NAVY if modern else INK, spaceAfter=2),
        'meta': ParagraphStyle('meta', fontName='ArialResume', fontSize=8.1, leading=10, textColor=MUTED, spaceAfter=4),
        'skill': ParagraphStyle('skill', fontName='ArialResume', fontSize=8.2, leading=11.3, textColor=INK, spaceAfter=2),
        'contact': ParagraphStyle('contact', fontName='ArialResume', fontSize=8.1, leading=11.5, textColor=colors.white if modern else INK),
    }


def section(label, s, modern):
    return [Paragraph(clean(label.upper() if modern else label), s['section']), HRFlowable(width='100%', thickness=.7 if modern else .4, color=BLUE if modern else colors.HexColor('#B3BBC5')), Spacer(1, 5)]


def on_page(canvas, doc, modern):
    canvas.saveState()
    if modern:
        canvas.setFillColor(BLUE)
        canvas.rect(0, 0, 6, PAGE_H, fill=1, stroke=0)
        canvas.setStrokeColor(colors.HexColor('#D9E9FB'))
        canvas.line(42, PAGE_H - 33, PAGE_W - 42, PAGE_H - 33)
    canvas.setFillColor(MUTED)
    canvas.setFont('ArialResume', 7.5)
    canvas.drawString(43, 24, 'Anas DADI  |  dadianas.com')
    canvas.drawRightString(PAGE_W - 43, 24, str(doc.page))
    canvas.restoreState()


def header(s, modern):
    contact = 'Paris, France  |  +33 6 81 42 15 85  |  dadi.anas@hotmail.fr  |  dadianas.com  |  linkedin.com/in/dadianas  |  github.com/DadiAnas'
    if not modern:
        return [
            Paragraph('<b>Anas DADI</b>', ParagraphStyle('name', fontName='ArialResumeBold', fontSize=20, leading=24, textColor=INK)),
            Paragraph('DevSecOps / SRE Engineer  |  Cloud Architect  |  Big Data Engineer', ParagraphStyle('tagline', fontName='ArialResumeBold', fontSize=9.3, leading=13, textColor=INK, spaceAfter=5)),
            Paragraph(clean(contact), s['contact']),
            Spacer(1, 6),
            HRFlowable(width='100%', thickness=.8, color=INK),
        ]

    hero_name = Paragraph('<font color="#FFFFFF"><b>Anas DADI</b></font>', ParagraphStyle('hero-name', fontName='ArialResumeBold', fontSize=21, leading=25))
    hero_title = Paragraph('<font color="#A9D6FF">DEVSECOPS / SRE ENGINEER  ·  CLOUD ARCHITECT</font>', ParagraphStyle('hero-title', fontName='ArialResumeBold', fontSize=8.6, leading=12, spaceAfter=8))
    hero_contact = Paragraph(clean(contact), s['contact'])
    portrait = Image(str(SITE / 'public/img/ui/avatar.jpeg'), width=72, height=72)
    hero = Table([[portrait, [hero_name, hero_title, hero_contact]]], colWidths=[87, PAGE_W - 84 - 87], hAlign='LEFT')
    hero.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), NAVY),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (0, 0), 11),
        ('RIGHTPADDING', (0, 0), (0, 0), 3),
        ('LEFTPADDING', (1, 0), (1, 0), 2),
        ('RIGHTPADDING', (1, 0), (1, 0), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 13),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 13),
        ('ROUNDEDCORNERS', [10, 10, 10, 10]),
    ]))
    return [hero, Spacer(1, 10)]


def build(modern):
    variant = 'modern' if modern else 'simple'
    path = OUTPUT / f'resume-{variant}.pdf'
    s = styles(modern)
    story = header(s, modern)
    story += section('Profile', s, modern)
    story.append(Paragraph(clean(
        'Big Data and Cloud Computing engineer with several years of DevSecOps, SRE and cloud architecture experience. '
        'Works across AWS, Azure, GCP and IBM Cloud, from migration and Kubernetes platforms to security, observability, incident response and data/AI systems. '
        'Based in Paris; open to hybrid and fully remote permanent or freelance-umbrella roles.'
    ), s['body']))
    if modern:
        story.append(Paragraph('<font color="#137EFF"><b>CLOUD  ·  KUBERNETES  ·  DEVSECOPS  ·  SRE  ·  DATA &amp; AI</b></font>', ParagraphStyle('focus', fontName='ArialResumeBold', fontSize=8.3, leading=12, spaceBefore=6, spaceAfter=2)))

    story += section('Professional experience', s, modern)
    for role in DATA['experiences']:
        if role['id'] == 'stellantis':
            story.append(PageBreak())
        story.append(CondPageBreak(58))
        story.append(Paragraph(f"{clean(role['role'])}  |  {clean(role['company'])}", s['role']))
        story.append(Paragraph(f"{clean(role['period'])}  |  {role['kind']}", s['meta']))
        for task in role['highlights']:
            story.append(Paragraph(clean(task), s['bullet'], bulletText='•'))
        story.append(Spacer(1, 5))

    story += section('Technical skills', s, modern)
    for group in DATA['expertise']:
        skills = ', '.join(group['skills'])
        story.append(Paragraph(f"<b>{clean(group['title'])}:</b> {clean(skills)}", s['skill']))

    story += section('Education', s, modern)
    for line in [
        'ENSET Mohammedia  |  CS Engineering, Big Data & Cloud Computing  |  2018-2021',
        'CPGE  |  Physics and Engineering Science  |  2016-2018',
        'Tarik Ibnou Ziad High School  |  Mathematics Science A  |  2013-2016',
    ]:
        story.append(Paragraph(clean(line), s['body']))

    story += section('Certifications and languages', s, modern)
    story.append(Paragraph(clean('Hadoop Foundations; Advanced Python; Modernizing Data Lakes and Data Warehouses with GCP; Building Resilient Streaming Analytics Systems on GCP; Huawei Security; Huawei AI; TCF French Advanced.'), s['body']))
    story.append(Paragraph(clean('Arabic - native  |  French - advanced  |  English - advanced'), s['body']))

    doc = SimpleDocTemplate(str(path), pagesize=A4, leftMargin=42, rightMargin=42, topMargin=44, bottomMargin=42, title=f'Anas DADI - {variant.title()} Resume', author='Anas DADI')
    doc.build(story, onFirstPage=lambda c, d: on_page(c, d, modern), onLaterPages=lambda c, d: on_page(c, d, modern))
    assert path.stat().st_size > 10_000
    return path


assert DATA['experiences'] and all(len(role['highlights']) == len(role['fr']['highlights']) for role in DATA['experiences'])
print(build(False))
