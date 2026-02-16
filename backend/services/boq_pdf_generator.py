"""
BOQ PDF Generator
Generates professional PDF documents for Bill of Quantities
Styled according to LEXA brand guidelines
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import inch, mm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, HRFlowable, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from io import BytesIO
from datetime import datetime
import os

# Brand Colors
BRAND_BLACK = colors.HexColor('#1A1A1A')
BRAND_GRAY = colors.HexColor('#6B7280')
BRAND_LIGHT_GRAY = colors.HexColor('#9CA3AF')
BRAND_BG = colors.HexColor('#F9F9F7')
BRAND_WHITE = colors.white
BRAND_BORDER = colors.HexColor('#E5E7EB')


class BOQPDFGenerator:
    """Generate professional BOQ PDFs - LEXA branded"""
    
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self._setup_custom_styles()
    
    def _setup_custom_styles(self):
        """Setup custom paragraph styles following LEXA brand"""
        
        # Logo style
        self.styles.add(ParagraphStyle(
            name='Logo',
            parent=self.styles['Heading1'],
            fontSize=28,
            textColor=BRAND_BLACK,
            spaceAfter=2,
            alignment=TA_LEFT,
            fontName='Helvetica-Bold'
        ))
        
        # Tagline
        self.styles.add(ParagraphStyle(
            name='Tagline',
            parent=self.styles['Normal'],
            fontSize=9,
            textColor=BRAND_LIGHT_GRAY,
            spaceAfter=0,
            alignment=TA_LEFT,
            fontName='Helvetica'
        ))
        
        # Document title
        self.styles.add(ParagraphStyle(
            name='DocTitle',
            parent=self.styles['Heading1'],
            fontSize=18,
            textColor=BRAND_BLACK,
            spaceAfter=8,
            spaceBefore=20,
            alignment=TA_LEFT,
            fontName='Helvetica-Bold'
        ))
        
        # Section header
        self.styles.add(ParagraphStyle(
            name='SectionHeader',
            parent=self.styles['Heading2'],
            fontSize=11,
            textColor=BRAND_GRAY,
            spaceAfter=10,
            spaceBefore=20,
            fontName='Helvetica-Bold'
        ))
        
        # Subsection
        self.styles.add(ParagraphStyle(
            name='SubSection',
            parent=self.styles['Heading3'],
            fontSize=11,
            textColor=BRAND_BLACK,
            spaceAfter=6,
            spaceBefore=12,
            fontName='Helvetica-Bold'
        ))
        
        # Body text
        self.styles.add(ParagraphStyle(
            name='CustomBody',
            parent=self.styles['Normal'],
            fontSize=10,
            textColor=BRAND_GRAY,
            spaceAfter=4,
            fontName='Helvetica'
        ))
        
        # Small text
        self.styles.add(ParagraphStyle(
            name='SmallText',
            parent=self.styles['Normal'],
            fontSize=8,
            textColor=BRAND_LIGHT_GRAY,
            spaceAfter=2,
            fontName='Helvetica'
        ))
    
    def generate_client_boq_pdf(self, client_summary: dict, session_id: str) -> BytesIO:
        """
        Generate client-facing BOQ PDF with LEXA branding
        
        Args:
            client_summary: Client BOQ data
            session_id: Session identifier
            
        Returns:
            BytesIO: PDF file buffer
        """
        buffer = BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=A4,
            rightMargin=20*mm,
            leftMargin=20*mm,
            topMargin=20*mm,
            bottomMargin=20*mm
        )
        
        story = []
        current_date = datetime.now().strftime("%d %B %Y")
        
        # ===== HEADER =====
        header_data = [[
            Paragraph("LEXA", self.styles['Logo']),
            Paragraph("LIGHTING • ELECTRONICS<br/>AUTOMATION • AUDIO", 
                     ParagraphStyle('Services', parent=self.styles['Normal'], 
                                   fontSize=8, textColor=BRAND_GRAY, 
                                   alignment=TA_RIGHT, leading=10))
        ]]
        header_table = Table(header_data, colWidths=[3*inch, 3*inch])
        header_table.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ]))
        story.append(header_table)
        story.append(Paragraph("LIFE STYLE", self.styles['Tagline']))
        
        # Divider
        story.append(Spacer(1, 0.15*inch))
        story.append(HRFlowable(width="100%", thickness=1, color=BRAND_BORDER, spaceAfter=0.2*inch))
        
        # ===== DOCUMENT TITLE =====
        story.append(Paragraph("PROJECT PROPOSAL & BILL OF QUANTITIES", self.styles['DocTitle']))
        
        # Reference info
        ref_data = [
            ['Document ID:', session_id[:8].upper()],
            ['Date:', current_date],
            ['Valid Until:', f"{current_date} (30 days)"],
        ]
        
        ref_table = Table(ref_data, colWidths=[1.5*inch, 4*inch])
        ref_table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 9),
            ('TEXTCOLOR', (0, 0), (0, -1), BRAND_GRAY),
            ('TEXTCOLOR', (1, 0), (1, -1), BRAND_BLACK),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ]))
        story.append(ref_table)
        story.append(Spacer(1, 0.2*inch))
        
        # ===== PROJECT OVERVIEW =====
        overview = client_summary.get('project_overview', {})
        story.append(Paragraph("PROJECT OVERVIEW", self.styles['SectionHeader']))
        
        overview_data = [
            ['Property Type:', overview.get('property_type', 'N/A')],
            ['Total Area:', f"{overview.get('area_sqft', 0):,} sqft"],
            ['Project Stage:', overview.get('project_stage', 'N/A')],
            ['Objectives:', ', '.join(overview.get('objectives', []))],
        ]
        
        overview_table = Table(overview_data, colWidths=[1.5*inch, 4.5*inch])
        overview_table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
            ('FONTNAME', (1, 0), (1, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('TEXTCOLOR', (0, 0), (0, -1), BRAND_GRAY),
            ('TEXTCOLOR', (1, 0), (1, -1), BRAND_BLACK),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('TOPPADDING', (0, 0), (-1, -1), 6),
            ('BACKGROUND', (0, 0), (-1, -1), BRAND_BG),
            ('LEFTPADDING', (0, 0), (-1, -1), 12),
            ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ]))
        story.append(overview_table)
        
        # ===== RECOMMENDED SYSTEMS =====
        story.append(Paragraph("RECOMMENDED SYSTEMS", self.styles['SectionHeader']))
        
        systems = client_summary.get('selected_systems', [])
        
        # Create systems table
        sys_data = [['System', 'Tier', 'Complexity', 'Est. Price']]
        for system in systems:
            sys_data.append([
                system.get('system_name', 'Unknown'),
                system.get('tier', 'N/A'),
                f"{system.get('complexity', 0)}/10",
                system.get('estimated_price', 'TBD')
            ])
        
        sys_table = Table(sys_data, colWidths=[2.2*inch, 1.2*inch, 1*inch, 1.6*inch])
        sys_table.setStyle(TableStyle([
            # Header
            ('BACKGROUND', (0, 0), (-1, 0), BRAND_BLACK),
            ('TEXTCOLOR', (0, 0), (-1, 0), BRAND_WHITE),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 9),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
            ('TOPPADDING', (0, 0), (-1, 0), 8),
            
            # Data rows
            ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 1), (-1, -1), 9),
            ('TEXTCOLOR', (0, 1), (-1, -1), BRAND_BLACK),
            ('ALIGN', (2, 1), (2, -1), 'CENTER'),
            ('ALIGN', (3, 1), (3, -1), 'RIGHT'),
            ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
            ('TOPPADDING', (0, 1), (-1, -1), 8),
            
            # Borders
            ('LINEBELOW', (0, 0), (-1, -2), 0.5, BRAND_BORDER),
            ('BOX', (0, 0), (-1, -1), 0.5, BRAND_BORDER),
        ]))
        story.append(sys_table)
        
        # System details
        story.append(Spacer(1, 0.2*inch))
        for idx, system in enumerate(systems, 1):
            story.append(Paragraph(
                f"{idx}. {system.get('system_name', 'Unknown System')}",
                self.styles['SubSection']
            ))
            
            # Key features
            features = system.get('key_features', [])
            if features:
                for feature in features[:4]:
                    story.append(Paragraph(f"• {feature}", self.styles['CustomBody']))
            
            story.append(Spacer(1, 0.1*inch))
        
        # ===== TIER BREAKDOWN =====
        tier_breakdown = client_summary.get('tier_breakdown', {})
        if tier_breakdown:
            story.append(Paragraph("TIER BREAKDOWN", self.styles['SectionHeader']))
            
            tier_data = [['Tier', 'Feature Count']]
            for tier, count in tier_breakdown.items():
                tier_data.append([tier, str(count)])
            
            tier_table = Table(tier_data, colWidths=[3*inch, 2*inch])
            tier_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), BRAND_BLACK),
                ('TEXTCOLOR', (0, 0), (-1, 0), BRAND_WHITE),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, 0), 9),
                ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
                ('FONTSIZE', (0, 1), (-1, -1), 10),
                ('ALIGN', (1, 0), (1, -1), 'CENTER'),
                ('BOX', (0, 0), (-1, -1), 0.5, BRAND_BORDER),
                ('LINEBELOW', (0, 0), (-1, -2), 0.5, BRAND_BORDER),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
                ('TOPPADDING', (0, 0), (-1, -1), 8),
            ]))
            story.append(tier_table)
        
        # ===== PROJECT SUMMARY =====
        story.append(Paragraph("PROJECT SUMMARY", self.styles['SectionHeader']))
        
        summary_data = [
            ['Total Systems:', str(len(systems))],
            ['Estimated Timeline:', client_summary.get('estimated_timeline', 'TBD')],
            ['Overall Complexity:', f"{client_summary.get('complexity_score', 0)}/10"],
        ]
        
        summary_table = Table(summary_data, colWidths=[2*inch, 4*inch])
        summary_table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
            ('FONTNAME', (1, 0), (1, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('TEXTCOLOR', (0, 0), (0, -1), BRAND_GRAY),
            ('TEXTCOLOR', (1, 0), (1, -1), BRAND_BLACK),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ]))
        story.append(summary_table)
        
        # ===== NEXT STEPS =====
        story.append(Paragraph("WHAT HAPPENS NEXT", self.styles['SectionHeader']))
        
        next_steps = client_summary.get('next_steps', [
            "Our team will contact you within 24 hours",
            "Schedule a complimentary site survey",
            "Receive detailed technical proposal",
            "Visit LEXA PREMIER to see systems in action"
        ])
        for idx, step in enumerate(next_steps, 1):
            story.append(Paragraph(f"{idx}. {step}", self.styles['CustomBody']))
        
        # ===== TERMS =====
        story.append(Spacer(1, 0.2*inch))
        story.append(Paragraph("TERMS & CONDITIONS", self.styles['SectionHeader']))
        
        terms = """This proposal is valid for 30 days from the date of issue. Final pricing is subject to site survey 
        and detailed scope confirmation. All prices are in UAE Dirhams (AED) and exclude VAT (5%) unless stated. 
        Payment Terms: 50% advance, 40% on delivery, 10% on completion. Warranty as per manufacturer specifications."""
        
        story.append(Paragraph(terms, self.styles['SmallText']))
        
        # ===== FOOTER =====
        story.append(Spacer(1, 0.3*inch))
        story.append(HRFlowable(width="100%", thickness=1, color=BRAND_BORDER, spaceBefore=0.1*inch))
        story.append(Spacer(1, 0.1*inch))
        
        footer_style = ParagraphStyle(
            name='Footer',
            parent=self.styles['Normal'],
            fontSize=9,
            textColor=BRAND_GRAY,
            alignment=TA_CENTER,
            fontName='Helvetica'
        )
        
        story.append(Paragraph("<b>LEXA LIFESTYLE TRADING LLC</b>", 
                              ParagraphStyle('FooterBold', parent=footer_style, 
                                            textColor=BRAND_BLACK, fontName='Helvetica-Bold')))
        story.append(Paragraph("Al Quoz IND 1, SZR - Interchange No 3 - Dubai", footer_style))
        story.append(Paragraph("+971 4 267 0470 | info@lexalifestyle.com", footer_style))
        story.append(Paragraph("TRN: 104472899400003", 
                              ParagraphStyle('TRN', parent=footer_style, fontSize=8, textColor=BRAND_LIGHT_GRAY)))
        
        # Build PDF
        doc.build(story)
        buffer.seek(0)
        
        return buffer
    
    def save_pdf_to_file(self, buffer: BytesIO, session_id: str) -> str:
        """
        Save PDF buffer to file
        
        Args:
            buffer: PDF BytesIO buffer
            session_id: Session ID for filename
            
        Returns:
            str: File path
        """
        # Create directory if not exists
        pdf_dir = "/app/backend/generated_pdfs"
        os.makedirs(pdf_dir, exist_ok=True)
        
        # Generate filename
        filename = f"LEXA_Proposal_{session_id[:8].upper()}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
        filepath = os.path.join(pdf_dir, filename)
        
        # Write to file
        with open(filepath, 'wb') as f:
            f.write(buffer.getvalue())
        
        return filepath


# Singleton instance
_pdf_generator = None

def get_pdf_generator() -> BOQPDFGenerator:
    """Get singleton PDF generator instance"""
    global _pdf_generator
    if _pdf_generator is None:
        _pdf_generator = BOQPDFGenerator()
    return _pdf_generator
