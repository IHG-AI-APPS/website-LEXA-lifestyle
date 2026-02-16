"""
PDF Quote Generator for LEXA Calculator
Creates professional, branded PDF quotes using ReportLab
Styled according to LEXA brand guidelines
"""

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, mm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image, HRFlowable
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_CENTER, TA_RIGHT, TA_LEFT
from typing import Dict, List, Any
from io import BytesIO
from datetime import datetime

# Brand Colors
BRAND_BLACK = colors.HexColor('#1A1A1A')
BRAND_GRAY = colors.HexColor('#6B7280')
BRAND_LIGHT_GRAY = colors.HexColor('#9CA3AF')
BRAND_BG = colors.HexColor('#F9F9F7')
BRAND_WHITE = colors.white
BRAND_BORDER = colors.HexColor('#E5E7EB')


class PDFQuoteGenerator:
    """Generate professional PDF quotes for calculator submissions - LEXA branded"""
    
    @staticmethod
    def generate_quote_pdf(
        submission_id: str,
        project_type: str,
        sub_category: str,
        total_area: int,
        emirate: str,
        city: str,
        contact_name: str,
        contact_email: str,
        contact_phone: str,
        total_cost: int,
        estimated_timeline_weeks: int,
        cost_breakdown: List[Dict[str, Any]],
        timeline: str,
        budget_range: str,
        selected_solutions: Dict[str, str],
        additional_features: List[str] = None,
    ) -> BytesIO:
        """
        Generate PDF quote document with LEXA branding
        
        Returns:
            BytesIO: PDF file in memory
        """
        buffer = BytesIO()
        
        # Create PDF document
        doc = SimpleDocTemplate(
            buffer,
            pagesize=A4,
            rightMargin=20*mm,
            leftMargin=20*mm,
            topMargin=20*mm,
            bottomMargin=20*mm,
        )
        
        # Container for the 'Flowable' objects
        elements = []
        
        # Define styles
        styles = getSampleStyleSheet()
        
        # Custom styles - LEXA Brand
        logo_style = ParagraphStyle(
            'Logo',
            parent=styles['Heading1'],
            fontSize=28,
            textColor=BRAND_BLACK,
            spaceAfter=2,
            alignment=TA_LEFT,
            fontName='Helvetica-Bold',
            letterSpacing=4
        )
        
        tagline_style = ParagraphStyle(
            'Tagline',
            parent=styles['Normal'],
            fontSize=9,
            textColor=BRAND_LIGHT_GRAY,
            spaceAfter=0,
            alignment=TA_LEFT,
            fontName='Helvetica',
            letterSpacing=2
        )
        
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=18,
            textColor=BRAND_BLACK,
            spaceAfter=8,
            spaceBefore=20,
            alignment=TA_LEFT,
            fontName='Helvetica-Bold'
        )
        
        heading_style = ParagraphStyle(
            'CustomHeading',
            parent=styles['Heading2'],
            fontSize=11,
            textColor=BRAND_GRAY,
            spaceAfter=10,
            spaceBefore=20,
            fontName='Helvetica-Bold',
            textTransform='uppercase'
        )
        
        body_style = ParagraphStyle(
            'CustomBody',
            parent=styles['Normal'],
            fontSize=10,
            textColor=BRAND_GRAY,
            spaceAfter=4,
            fontName='Helvetica'
        )
        
        small_style = ParagraphStyle(
            'Small',
            parent=styles['Normal'],
            fontSize=8,
            textColor=BRAND_LIGHT_GRAY,
            spaceAfter=2,
            fontName='Helvetica'
        )
        
        # ===== HEADER =====
        # Brand Logo
        header_data = [[
            Paragraph("LEXA", logo_style),
            Paragraph("LIGHTING • ELECTRONICS<br/>AUTOMATION • AUDIO", 
                     ParagraphStyle('Services', parent=styles['Normal'], 
                                   fontSize=8, textColor=BRAND_GRAY, 
                                   alignment=TA_RIGHT, leading=10))
        ]]
        header_table = Table(header_data, colWidths=[3*inch, 3*inch])
        header_table.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ]))
        elements.append(header_table)
        elements.append(Paragraph("LIFE STYLE", tagline_style))
        
        # Divider line
        elements.append(Spacer(1, 0.15*inch))
        elements.append(HRFlowable(width="100%", thickness=1, color=BRAND_BORDER, spaceAfter=0.2*inch))
        
        # ===== DOCUMENT TITLE =====
        elements.append(Paragraph("PROPOSAL FOR SMART HOME AUTOMATION", title_style))
        
        # Quote metadata
        current_date = datetime.now().strftime("%d %B %Y")
        validity_date = datetime.now().strftime("%d %B %Y")
        
        meta_data = [
            ['Quotation No:', submission_id[:12].upper()],
            ['Date:', current_date],
            ['Valid Until:', f"{validity_date} (30 days)"],
        ]
        
        meta_table = Table(meta_data, colWidths=[1.5*inch, 4*inch])
        meta_table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 9),
            ('TEXTCOLOR', (0, 0), (0, -1), BRAND_GRAY),
            ('TEXTCOLOR', (1, 0), (1, -1), BRAND_BLACK),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
            ('TOPPADDING', (0, 0), (-1, -1), 4),
        ]))
        elements.append(meta_table)
        elements.append(Spacer(1, 0.2*inch))
        
        # ===== CUSTOMER INFORMATION =====
        elements.append(Paragraph("PROPOSED TO", heading_style))
        
        customer_data = [
            ['Name:', contact_name],
            ['Email:', contact_email],
            ['Phone:', contact_phone],
            ['Location:', f"{city}, {emirate}" if city else emirate],
        ]
        
        customer_table = Table(customer_data, colWidths=[1.2*inch, 4.8*inch])
        customer_table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
            ('FONTNAME', (1, 0), (1, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('TEXTCOLOR', (0, 0), (0, -1), BRAND_GRAY),
            ('TEXTCOLOR', (1, 0), (1, -1), BRAND_BLACK),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('TOPPADDING', (0, 0), (-1, -1), 6),
            ('BACKGROUND', (0, 0), (-1, -1), BRAND_BG),
            ('LEFTPADDING', (0, 0), (-1, -1), 12),
            ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ]))
        elements.append(customer_table)
        
        # ===== PROJECT DETAILS =====
        elements.append(Paragraph("PROJECT DETAILS", heading_style))
        
        project_data = [
            ['Project Type:', f"{project_type.title()} - {sub_category.replace('-', ' ').title()}"],
            ['Total Area:', f"{total_area:,} sq ft"],
            ['Desired Timeline:', timeline.replace('-', ' to ').title()],
            ['Budget Range:', budget_range.replace('-', ' to ').upper()],
        ]
        
        project_table = Table(project_data, colWidths=[1.5*inch, 4.5*inch])
        project_table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
            ('FONTNAME', (1, 0), (1, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('TEXTCOLOR', (0, 0), (0, -1), BRAND_GRAY),
            ('TEXTCOLOR', (1, 0), (1, -1), BRAND_BLACK),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('TOPPADDING', (0, 0), (-1, -1), 6),
        ]))
        elements.append(project_table)
        
        # ===== COST BREAKDOWN =====
        elements.append(Paragraph("ITEM DETAILS", heading_style))
        
        # Create breakdown table with header
        breakdown_data = [['Description', 'Amount (AED)']]
        for item in cost_breakdown:
            breakdown_data.append([
                item['name'],
                f"{item['cost']:,}"
            ])
        
        breakdown_table = Table(breakdown_data, colWidths=[4.5*inch, 1.5*inch])
        breakdown_table.setStyle(TableStyle([
            # Header row
            ('BACKGROUND', (0, 0), (-1, 0), BRAND_BLACK),
            ('TEXTCOLOR', (0, 0), (-1, 0), BRAND_WHITE),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 10),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 10),
            ('TOPPADDING', (0, 0), (-1, 0), 10),
            
            # Data rows
            ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 1), (-1, -1), 10),
            ('TEXTCOLOR', (0, 1), (-1, -1), BRAND_BLACK),
            ('ALIGN', (1, 1), (1, -1), 'RIGHT'),
            ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
            ('TOPPADDING', (0, 1), (-1, -1), 8),
            
            # Borders
            ('LINEBELOW', (0, 0), (-1, -2), 0.5, BRAND_BORDER),
            ('BOX', (0, 0), (-1, -1), 0.5, BRAND_BORDER),
        ]))
        elements.append(breakdown_table)
        elements.append(Spacer(1, 0.15*inch))
        
        # ===== TOTAL BOX =====
        total_data = [[
            Paragraph("ESTIMATED TOTAL INVESTMENT", 
                     ParagraphStyle('TotalLabel', parent=styles['Normal'], 
                                   fontSize=10, textColor=BRAND_WHITE, alignment=TA_LEFT)),
            Paragraph(f"AED {total_cost:,}",
                     ParagraphStyle('TotalValue', parent=styles['Normal'],
                                   fontSize=18, textColor=BRAND_WHITE, 
                                   alignment=TA_RIGHT, fontName='Helvetica-Bold'))
        ]]
        
        total_table = Table(total_data, colWidths=[3.5*inch, 2.5*inch])
        total_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), BRAND_BLACK),
            ('ALIGN', (0, 0), (0, -1), 'LEFT'),
            ('ALIGN', (1, 0), (1, -1), 'RIGHT'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('TOPPADDING', (0, 0), (-1, -1), 14),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 14),
            ('LEFTPADDING', (0, 0), (-1, -1), 14),
            ('RIGHTPADDING', (0, 0), (-1, -1), 14),
        ]))
        elements.append(total_table)
        
        # Timeline note
        elements.append(Spacer(1, 0.1*inch))
        elements.append(Paragraph(f"<b>Estimated Timeline:</b> {estimated_timeline_weeks} weeks", body_style))
        
        # ===== NEXT STEPS =====
        elements.append(Paragraph("WHAT HAPPENS NEXT", heading_style))
        
        next_steps = [
            "Our team will contact you within 24 hours to discuss your requirements",
            "Schedule a complimentary site survey at your convenience",
            "Receive a detailed technical proposal with final pricing",
            "Visit LEXA PREMIER Experience Centre to see systems in action",
        ]
        
        for idx, step in enumerate(next_steps, 1):
            elements.append(Paragraph(f"{idx}. {step}", body_style))
        
        elements.append(Spacer(1, 0.2*inch))
        
        # ===== TERMS & CONDITIONS =====
        elements.append(Paragraph("TERMS & CONDITIONS", heading_style))
        terms = """This quotation is valid for 30 days from the date of issue. Final pricing may vary based on 
        site survey findings and specific product selections. All prices are in UAE Dirhams (AED) and exclude VAT 
        (5%) unless otherwise stated. Installation timeline may vary based on project complexity and product availability. 
        Payment terms: 50% advance, 40% on delivery, 10% on completion."""
        
        terms_style = ParagraphStyle(
            'Terms',
            parent=styles['Normal'],
            fontSize=8,
            textColor=BRAND_GRAY,
            spaceAfter=6,
            fontName='Helvetica',
            leading=12
        )
        elements.append(Paragraph(terms, terms_style))
        
        # ===== FOOTER =====
        elements.append(Spacer(1, 0.3*inch))
        elements.append(HRFlowable(width="100%", thickness=1, color=BRAND_BORDER, spaceBefore=0.1*inch))
        
        footer_style = ParagraphStyle(
            'Footer',
            parent=styles['Normal'],
            fontSize=9,
            textColor=BRAND_GRAY,
            alignment=TA_CENTER,
            fontName='Helvetica'
        )
        
        elements.append(Spacer(1, 0.1*inch))
        elements.append(Paragraph("<b>LEXA LIFESTYLE TRADING LLC</b>", 
                                 ParagraphStyle('FooterBold', parent=footer_style, 
                                               textColor=BRAND_BLACK, fontName='Helvetica-Bold')))
        elements.append(Paragraph("Al Quoz IND 1, SZR - Interchange No 3 - Dubai", footer_style))
        elements.append(Paragraph("+971 4 267 0470 | info@lexalifestyle.com", footer_style))
        elements.append(Paragraph("TRN: 104472899400003", 
                                 ParagraphStyle('TRN', parent=footer_style, fontSize=8, textColor=BRAND_LIGHT_GRAY)))
        
        # Build PDF
        doc.build(elements)
        
        # Get PDF from buffer
        buffer.seek(0)
        return buffer
