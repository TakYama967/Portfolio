#!/usr/bin/env python3
"""Generate Takumi Yamamoto resume PDF from portfolio JSON data."""

from __future__ import annotations

import json
import os
from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parents[1]
PORTFOLIO = ROOT / "portfolio"
OUT_DIR = ROOT / "public" / "resume"

PROJECT_DISPLAY_NAMES = {
    2: "JMC Recruit Site",
    6: "Seisa University",
    8: "Magnolia White",
    9: "Tapple Official Site",
}


def load_json(name: str) -> dict:
    return json.loads((PORTFOLIO / name).read_text(encoding="utf-8"))


def safe_text(text: str) -> str:
    replacements = {
        "\u2014": "-",
        "\u2013": "-",
        "\u2012": "-",
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u2022": "-",
        "\u00b7": " ",
        "･": " ",
        "–": "-",
    }
    for src, dst in replacements.items():
        text = text.replace(src, dst)
    return text.encode("latin-1", "replace").decode("latin-1").replace("?", "")


class ResumePDF(FPDF):
    accent = (37, 99, 235)
    muted = (85, 85, 85)
    body = (26, 26, 26)

    def header(self):
        pass

    def footer(self):
        self.set_y(-12)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(*self.muted)
        self.cell(0, 8, safe_text(f"Takumi Yamamoto - Resume - Page {self.page_no()}"), align="C")

    def section_title(self, title: str):
        self.ln(3)
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(*self.accent)
        self.cell(0, 6, title.upper(), new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(219, 234, 254)
        self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
        self.ln(4)

    def body_text(self, text: str, size: float = 10, leading: float = 5):
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "", size)
        self.set_text_color(*self.body)
        self.multi_cell(0, leading, safe_text(text))
        self.set_x(self.l_margin)
        self.ln(1)

    def bullet(self, text: str):
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "", 9.5)
        self.set_text_color(*self.body)
        self.cell(4, 4.5, "-")
        self.multi_cell(0, 4.5, safe_text(text))
        self.set_x(self.l_margin)


def build_pdf() -> Path:
    about = load_json("about.json")
    experience = load_json("experience.json")
    skills = load_json("skills.json")
    projects = load_json("projects.json")
    contact = load_json("contact.json")

    profile = about["profile"]
    email = contact["contact_info"]["email"]["address"]
    location = contact["contact_info"]["location"]["address"]
    github = next(link["url"] for link in contact["social_links"] if link["platform"] == "GitHub")
    linkedin = next(link["url"] for link in contact["social_links"] if link["platform"] == "LinkedIn")

    pdf = ResumePDF()
    pdf.set_auto_page_break(auto=True, margin=14)
    pdf.set_margins(16, 14, 16)
    pdf.add_page()

    pdf.set_font("Helvetica", "B", 22)
    pdf.set_text_color(20, 20, 20)
    pdf.cell(0, 10, profile["name"], new_x="LMARGIN", new_y="NEXT")

    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(*ResumePDF.accent)
    pdf.cell(0, 6, profile["title"], new_x="LMARGIN", new_y="NEXT")

    pdf.set_font("Helvetica", "", 9.5)
    pdf.set_text_color(*ResumePDF.muted)
    pdf.cell(
        0,
        5,
        f"{location}  |  {email}  |  GitHub: {github}  |  LinkedIn: {linkedin}",
        new_x="LMARGIN",
        new_y="NEXT",
    )
    pdf.ln(4)

    pdf.section_title("Summary")
    pdf.body_text(about["introduction"]["english"])

    pdf.section_title("Technical Skills")
    for category in skills["categories"]:
        names = ", ".join(skill["name"] for skill in category["skills"])
        pdf.set_font("Helvetica", "B", 9.5)
        pdf.set_text_color(*ResumePDF.body)
        pdf.cell(0, 4.5, category["name"], new_x="LMARGIN", new_y="NEXT")
        pdf.set_font("Helvetica", "", 9.5)
        pdf.set_text_color(*ResumePDF.muted)
        pdf.multi_cell(0, 4.5, names)
        pdf.ln(1)

    pdf.section_title("Professional Experience")
    for job in experience["timeline"]:
        pdf.set_font("Helvetica", "B", 10.5)
        pdf.set_text_color(*ResumePDF.body)
        pdf.cell(130, 5, safe_text(job["position"]))
        pdf.set_font("Helvetica", "", 9.5)
        pdf.set_text_color(*ResumePDF.muted)
        pdf.cell(0, 5, safe_text(job["period"]), align="R", new_x="LMARGIN", new_y="NEXT")

        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(51, 51, 51)
        pdf.cell(0, 5, safe_text(f'{job["company"]} - {job["location"]}'), new_x="LMARGIN", new_y="NEXT")
        pdf.body_text(job["description"], size=9.5, leading=4.5)
        for item in job["key_achievements"][:3]:
            pdf.bullet(item)
        pdf.set_font("Helvetica", "I", 9)
        pdf.set_text_color(*ResumePDF.muted)
        pdf.set_x(pdf.l_margin)
        pdf.multi_cell(0, 4.2, safe_text("Technologies: " + ", ".join(job["technologies"])))
        pdf.ln(2)

    pdf.section_title("Selected Projects")
    for project in projects["projects"]:
        url = project.get("live_url") or project.get("demo_url")
        if not url:
            continue
        description = project["description"].split(".")[0].strip() + "."
        tech = ", ".join(project["technologies"][:6])
        pdf.set_font("Helvetica", "B", 10)
        pdf.set_text_color(*ResumePDF.body)
        display_name = PROJECT_DISPLAY_NAMES.get(project["id"], project["name"])
        pdf.cell(0, 5, safe_text(f'{display_name} ({project["year"]})'), new_x="LMARGIN", new_y="NEXT")
        pdf.set_font("Helvetica", "I", 9)
        pdf.set_text_color(*ResumePDF.muted)
        pdf.set_x(pdf.l_margin)
        pdf.multi_cell(0, 4.2, safe_text(f"{tech} | {url}"))
        pdf.set_x(pdf.l_margin)
        pdf.body_text(description, size=9.5, leading=4.5)

    pdf.section_title("Certifications")
    for cert in skills["certifications"]:
        pdf.bullet(safe_text(f'{cert["name"]} - {cert["issuer"]} ({cert["date"]})'))

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    pdf_path = OUT_DIR / "takumi-yamamoto-resume.pdf"
    temp_path = OUT_DIR / "takumi-yamamoto-resume.tmp.pdf"
    pdf.output(str(temp_path))

    try:
        os.replace(temp_path, pdf_path)
    except PermissionError:
        fallback_path = OUT_DIR / "takumi-yamamoto-resume-latest.pdf"
        os.replace(temp_path, fallback_path)
        print(
            f"Note: {pdf_path.name} is open, so the resume was saved to {fallback_path.name} instead."
        )
        return fallback_path

    return pdf_path


if __name__ == "__main__":
    path = build_pdf()
    print(f"Resume generated: {path}")
