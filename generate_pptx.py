from pptx import Presentation
from pptx.util import Inches, Pt
import os

prs = Presentation()

# Slide 1
slide = prs.slides.add_slide(prs.slide_layouts[1])
slide.shapes.title.text = "The Problem: Original DigiYatra"
tf = slide.shapes.placeholders[1].text_frame
tf.text = "Fragmented Experience & Limited Scope"
p = tf.add_paragraph()
p.text = "- Strictly a single-purpose utility for airport gates."
p.level = 1
p = tf.add_paragraph()
p.text = "- Siloed Functionality: Separate apps for flights, hotels, check-in."
p.level = 1
p = tf.add_paragraph()
p.text = "- UI Clutter: Utilitarian design lacking modern aesthetics."
p.level = 1
p = tf.add_paragraph()
p.text = "- No Monetization: Ignored destination discovery and contextual offers."
p.level = 1
p = tf.add_paragraph()
p.text = "Data Point: Travelers switch between 7-10 apps per journey."
p.level = 0

# Slide 2
slide = prs.slides.add_slide(prs.slide_layouts[1])
slide.shapes.title.text = "The Solution: DigiYatra 2.0 Redesign"
tf = slide.shapes.placeholders[1].text_frame
tf.text = "From Utility App to Travel Ecosystem"
p = tf.add_paragraph()
p.text = "- Unified Dashboard: Merged Flights, Hotels, and Identity."
p.level = 1
p = tf.add_paragraph()
p.text = "- Premium Aesthetics: Glassmorphism, dynamic gradients, smooth micro-animations."
p.level = 1
p = tf.add_paragraph()
p.text = "- Smart Navigation: Contextual sidebar replacing heavy menus."
p.level = 1
p = tf.add_paragraph()
p.text = "- Integrated Booking & Offers: Built-in discovery cards and bank integrations."
p.level = 1

# Slide 3
slide = prs.slides.add_slide(prs.slide_layouts[1])
slide.shapes.title.text = "Value Addition & Informatics"
tf = slide.shapes.placeholders[1].text_frame
tf.text = "Time & Friction Reduction"
p = tf.add_paragraph()
p.text = "- Airport Entry: Saved ~4 mins (Auto-detect vs manual scan)"
p.level = 1
p = tf.add_paragraph()
p.text = "- Hotel Check-in: Saved ~15 mins (Pre-filled Form-C + Biometric)"
p.level = 1
p = tf.add_paragraph()
p.text = "- Finding Offers: Saved ~10 mins (Contextual vs External search)"
p.level = 1
p = tf.add_paragraph()
p.text = "Impact: By integrating hotels, we capture 100% of the travel timeline instead of just 15% at the airport."
p.level = 0

# Slide 4
slide = prs.slides.add_slide(prs.slide_layouts[1])
slide.shapes.title.text = "Business Value & The Future"
tf = slide.shapes.placeholders[1].text_frame
tf.text = "Monetization and Next-Gen Travel"
p = tf.add_paragraph()
p.text = "- New Revenue Streams: Massive affiliate/partnership channel (HSBC, HDFC, Hotels)."
p.level = 1
p = tf.add_paragraph()
p.text = "- Higher Retention: Reason to open the app before and after the flight."
p.level = 1
p = tf.add_paragraph()
p.text = "- Cross-Selling: Seamless flight-to-hotel integration increases conversion."
p.level = 1
p = tf.add_paragraph()
p.text = "- Future Proofing: Positioned to be India's ultimate travel super-app via ONDC."
p.level = 1

prs.save("DigiYatra_Case_Study.pptx")
print("Presentation generated successfully.")
