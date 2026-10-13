import json
from html import escape
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

SITE = Path(__file__).resolve().parents[1]
DATA = {r['id']: r for r in json.loads((SITE / 'scripts/resume-data.json').read_text())['experiences']}
BG = SITE / 'scripts/resume-backgrounds'
OUT = SITE / 'public/resume-modern.pdf'
W, H = A4
BLUE = colors.HexColor('#137EFF')
INK = colors.HexColor('#172B4A')
GRAY = colors.HexColor('#61728C')

pdfmetrics.registerFont(TTFont('FigmaArial', '/System/Library/Fonts/Supplemental/Arial.ttf'))
pdfmetrics.registerFont(TTFont('FigmaArialBold', '/System/Library/Fonts/Supplemental/Arial Bold.ttf'))
pdfmetrics.registerFontFamily('FigmaArial', normal='FigmaArial', bold='FigmaArialBold')


def normalize(text):
    return escape(text.replace('–', '-').replace('—', '-').replace('‑', '-'))


def paragraph(c, text, x, top, width, size=7.5, leading=10, bold=False, color=INK):
    style = ParagraphStyle('line', fontName='FigmaArialBold' if bold else 'FigmaArial', fontSize=size, leading=leading, textColor=color)
    p = Paragraph(normalize(text), style)
    _, height = p.wrap(width, H)
    p.drawOn(c, x, H - top - height)
    return top + height


def background(c, page):
    c.drawImage(ImageReader(str(next(BG.glob(f'page{page}-*.jpg')))), 0, 0, width=W, height=H)


def cover(c):
    background(c, 0)
    # Replace the old title and summary while preserving the portrait, frame and skills map.
    c.setFillColor(colors.white)
    c.roundRect(160, H - 118, 410, 106, 5, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont('FigmaArialBold', 16.5)
    c.drawString(177, H - 40, 'Anas DADI')
    c.setFillColor(BLUE)
    c.setFont('FigmaArialBold', 10.4)
    c.drawString(177, H - 57, 'DevSecOps / SRE Engineer  -  Cloud Architect')
    paragraph(c,
        'Big Data and Cloud Computing engineer with several years of experience in multicloud architecture, Kubernetes, security, observability and data/AI systems. Based in Paris; open to hybrid and fully remote roles.',
        177, 66, 375, size=7.2, leading=9.3)
    c.setFillColor(GRAY)
    c.setFont('FigmaArial', 7.8)
    c.drawRightString(552, H - 109, 'Paris, France')
    c.showPage()


FOCUS = {
    'bnp': [
        ('Cloud & orchestration', ['IBM Cloud, AWS, Azure', 'Highly available Kubernetes', 'Terraform, Ansible, GitOps']),
        ('Delivery & security', ['Microservices CI/CD', 'SAST, DAST, quality gates', 'HashiCorp Vault, artifacts']),
        ('Production reliability', ['N3/L3, ServiceNow, SLIs/SLOs', 'Dynatrace, Prometheus, Grafana', 'Capacity, chaos engineering']),
        ('Data & AI', ['Airflow DAGs, Kubernetes operators', 'Anomaly detection', 'Predictive incident models']),
    ],
    'stellantis': [
        ('Migration strategy', ['Thousands of projects', 'AWS and Azure landing zones', 'Cross-functional coordination']),
        ('Cloud architecture', ['HCP Terraform, CloudFormation', 'Azure Resource Manager', 'AWS multi-account / Azure tenancy']),
        ('Security & governance', ['AWS Inspector, Azure Security Center', 'Secure CI/CD and IaC documentation', 'AWS Audit Manager, Azure Policy']),
        ('Recovery & insight', ['Azure Site Recovery, AWS Backup', 'Cost and performance reviews', 'Power BI and QuickSight']),
    ],
    'icade': [
        ('Delivery', ['GitLab CI and Jenkins', 'FastAPI, Django, Flask', 'Laravel and Symfony']),
        ('Kubernetes & storage', ['vSphere to Kubernetes on LXD', 'Rook Ceph, GlusterFS', 'Longhorn and OpenEBS']),
        ('Observability', ['Prometheus, VictoriaMetrics', 'Grafana, Zabbix', 'Loki and Promtail']),
        ('Data & automation', ['Redis, PostgreSQL, MariaDB', 'Elasticsearch, Vault', 'Python, Bash, Go, Jupyter']),
    ],
    'avito': [
        ('AWS platform', ['Terraform and CloudFormation', 'Kubernetes on EKS', 'RDS, DynamoDB, Elasticsearch']),
        ('Operations', ['Ansible, Python and Bash', 'CloudWatch, Grafana, Prometheus', 'Secrets Manager and Vault']),
        ('Streaming & AI', ['Apache Kafka streams', 'Log anomaly detection', 'YOLO and SSD object detection']),
        ('Marketplace insight', ['Recommendation engines', 'Real-time analytics', 'NLP search and categorization']),
    ],
}


def structured_map(c, role_id):
    # Replace the dated mind maps with current, readable focus areas.
    c.setFillColor(colors.white)
    c.rect(60, 65, 485, 390, fill=1, stroke=0)
    c.setFillColor(BLUE)
    c.setFont('FigmaArialBold', 11)
    c.drawString(70, 421, 'Focus areas')
    colors_by_card = ['#1BA8EB', '#8D65DB', '#00A895', '#F09C39']
    for i, (label, items) in enumerate(FOCUS[role_id]):
        x = 70 + (i % 2) * 241
        y = 274 - (i // 2) * 150
        c.setFillColor(colors.HexColor('#F8FBFF'))
        c.setStrokeColor(colors.HexColor('#DBE8F7'))
        c.roundRect(x, y, 228, 132, 7, fill=1, stroke=1)
        c.setFillColor(colors.HexColor(colors_by_card[i]))
        c.roundRect(x, y, 4, 132, 2, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont('FigmaArialBold', 9)
        c.drawString(x + 15, y + 105, label)
        for j, item in enumerate(items):
            c.setFont('FigmaArial', 7.2)
            c.drawString(x + 15, y + 78 - j * 22, '- ' + item)


def role_page(c, role_id, bg_page, number):
    background(c, bg_page)
    c.setFillColor(colors.white)
    c.rect(40, H - 38, 300, 25, fill=1, stroke=0)
    c.setFillColor(BLUE)
    c.setFont('FigmaArialBold', 11.4)
    c.drawString(43, H - 29, f'Professional Experiences - {number}')

    # The original Figma card and blue edge stay in place; its obsolete copy is replaced.
    c.setFillColor(colors.white)
    c.roundRect(49, H - 387, 506, 352, 3, fill=1, stroke=0)
    c.setStrokeColor(colors.HexColor('#DCE7F4'))
    c.roundRect(49, H - 387, 506, 352, 3, fill=0, stroke=1)
    c.setFillColor(colors.HexColor('#8DD8F6'))
    c.rect(49, H - 387, 3, 352, fill=1, stroke=0)

    role = DATA[role_id]
    top = 47
    top = paragraph(c, f"{role['company']}  |  {role['role']}", 58, top, 485, size=9.4, leading=11.5, bold=True, color=BLUE) + 2
    top = paragraph(c, role['period'] + '  |  Paris, France', 58, top, 485, size=7.1, leading=9, color=GRAY) + 4
    top = paragraph(c, role['summary'], 58, top, 482, size=7.3, leading=9.4) + 6
    top = paragraph(c, 'Roles and responsibilities', 58, top, 480, size=7.5, leading=9.5, bold=True) + 4
    size, leading = (6.85, 8.85) if role_id == 'bnp' else (7.2, 9.25)
    for task in role['highlights']:
        top = paragraph(c, '- ' + task, 65, top, 472, size=size, leading=leading) + 1.1
    if top > 382:
        raise ValueError(f'{role_id} text overflow: {top:.1f}')
    structured_map(c, role_id)
    c.showPage()


def internships(c):
    page_h = W * 1459 / 2084
    c.setPageSize((W, page_h))
    c.drawImage(ImageReader(str(next(BG.glob('page4-*.jpg')))), 0, 0, width=W, height=page_h)
    c.setFillColor(colors.white)
    c.rect(35, 31, 166, 66, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont('FigmaArial', 5.6)
    for i, label in enumerate([
        'Hadoop Foundations',
        'Advanced Python',
        'GCP Data Lakes & Warehouses',
        'GCP Streaming Analytics',
        'Huawei Security',
        'Huawei AI',
        'TCF French Advanced',
    ]):
        c.drawString(43, 88 - i * 8, '- ' + label)
    c.showPage()


assert set(DATA) == {'bnp', 'stellantis', 'icade', 'avito', 'dxc', 'enset', 'abboud', 'barid'}
c = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
c.setTitle('Anas DADI - Modern Resume, Figma stable edition')
c.setAuthor('Anas DADI')
cover(c)
role_page(c, 'bnp', 1, 1)
role_page(c, 'stellantis', 1, 2)
role_page(c, 'icade', 2, 3)
role_page(c, 'avito', 3, 4)
internships(c)
c.save()
assert OUT.stat().st_size > 100_000
print(OUT)
