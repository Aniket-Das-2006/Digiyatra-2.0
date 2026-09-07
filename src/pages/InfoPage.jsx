import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import DocsSidebar from '../components/DocsSidebar';
import { getInfoItem, infoCategories } from '../data/infoDatabase';
import BackgroundDecorations from '../components/BackgroundDecorations';
import './InfoPage.css';
import './pages.css';

const InfoPage = () => {
  const { category, tab } = useParams();
  const [content, setContent] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState('');

  useEffect(() => {
    if (category && tab) {
      const item = getInfoItem(category, tab);
      if (item) {
        setContent(item);
        const cat = infoCategories.find(c => c.id === category);
        setCategoryTitle(cat ? cat.title : '');
      } else {
        setContent(null);
      }
    }
  }, [category, tab]);

  if (!category || !tab || !content) {
    return <Navigate to="/info/digiyatra/trust-center" replace />;
  }

  return (
    <div className="info-page-wrapper">
      <section className="hero">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/FC.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>DigiYatra Information Hub</h1>
          <p>Transparency, Privacy, and Trust</p>
        </div>
      </section>

      <div className="below-hero-content">
        <BackgroundDecorations />
        <div className="container page-layout-wrapper" style={{ position: 'relative', zIndex: 2, paddingBottom: '60px' }}>
          <DocsSidebar />
          
          <div className="main-content-area">
            <div className="function-detail-view function-guide" style={{ minHeight: '60vh' }}>
              <div className="info-header">
                <div className="info-breadcrumbs">
                  Info Hub / {categoryTitle} / {content.title}
                </div>
                <h1 className="info-title">{content.title}</h1>
              </div>
              
              <div 
                className="info-body"
                dangerouslySetInnerHTML={{ __html: content.content }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
