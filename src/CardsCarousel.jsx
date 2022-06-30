import React from 'react';
import Slider from 'react-slick';
import { Button, Icon, Card as UiCard } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { ConditionalLink } from '@plone/volto/components';
import { formatDate } from '@plone/volto/helpers/Utils/Date';
import PreviewImage from './PreviewImage';
import { truncate } from 'lodash';
import cx from 'classnames';

const tabletBreakpoint = 768;
const mobileBreakpoint = 480;

const Card = ({
  item,
  isEditMode,
  hasDate,
  hasDescription,
  maxDescription,
  styles,
}) => {
  const { title, description, EffectiveDate } = item;
  const locale = config.settings.dateLocale || 'en-gb';

  return (
    <UiCard fluid={true} className={cx(styles?.theme)}>
      <ConditionalLink className="image" item={item} condition={!isEditMode}>
        <PreviewImage item={item} alt={item.title} />
      </ConditionalLink>
      <UiCard.Content>
        {hasDate && EffectiveDate !== 'None' && (
          <UiCard.Meta>
            {formatDate({
              date: EffectiveDate,
              format: {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
              },
              locale: locale,
            })}
          </UiCard.Meta>
        )}
        {title && (
          <UiCard.Header>
            <ConditionalLink
              className="header-link"
              item={item}
              condition={!isEditMode}
            >
              {title}
            </ConditionalLink>
          </UiCard.Header>
        )}
        {hasDescription && description && (
          <UiCard.Description>
            {maxDescription
              ? truncate(description, {
                  length: maxDescription,
                  separator: ' ',
                })
              : description}
          </UiCard.Description>
        )}
      </UiCard.Content>
    </UiCard>
  );
};

const getSlidesToShow = (items, _slidesToShow) => {
  if (_slidesToShow <= 0) return 1;
  if (items.length >= _slidesToShow) return parseInt(_slidesToShow);
  return items.length;
};

const getSlidesToScroll = (items, _slidesToShow, _slidesToScroll) => {
  if (_slidesToScroll <= 0) return 1;
  const slidesToShow = getSlidesToShow(items, _slidesToShow);
  if (slidesToShow >= _slidesToScroll) return parseInt(_slidesToScroll);
  return slidesToShow;
};

const Arrows = (props) => {
  const { slider = {} } = props;

  return (
    <>
      <Button
        aria-label="Previous slide"
        className="slider-arrow prev-arrow tablet or lower hidden"
        icon
        onClick={() => {
          if (slider.current) {
            slider.current.slickPrev();
          }
        }}
      >
        <Icon className="ri-arrow-left-s-line" />
      </Button>
      <Button
        aria-label="Next slide"
        className="slider-arrow next-arrow tablet or lower hidden"
        icon
        onClick={() => {
          if (slider.current) {
            slider.current.slickNext();
          }
        }}
      >
        <Icon className="ri-arrow-right-s-line" />
      </Button>
    </>
  );
};

const CardsCarousel = ({ block, items, ...rest }) => {
  const slider = React.useRef(null);
  const [settings] = React.useState({
    dots: true,
    infinite: true,
    arrows: false,
    slidesToShow: getSlidesToShow(items, rest.slidesToShow || 4),
    slidesToScroll: getSlidesToScroll(
      items,
      rest.slidesToShow || 4,
      rest.slidesToScroll || 1,
    ),
    responsive: [
      {
        breakpoint: tabletBreakpoint,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: mobileBreakpoint,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });

  return rest.isEditMode ? (
    <div className="fluid-card-row">
      {items.map((item, index) => (
        <Card key={`card-${block}-${index}`} {...rest} item={item} />
      ))}
    </div>
  ) : (
    <div className="cards-carousel">
      <Slider {...settings} ref={slider}>
        {items.map((item, index) => (
          <Card
            key={`card-${block}-${index}`}
            {...rest}
            block={block}
            item={item}
          />
        ))}
      </Slider>
      {items.length > settings.slidesToShow && <Arrows slider={slider} />}
    </div>
  );
};

export default CardsCarousel;
