import React, { useMemo } from 'react';
import cx from 'classnames';
import Slider from 'react-slick';
import { Button, Icon, Card as UiCard, Image } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { ConditionalLink } from '@plone/volto/components';
import { formatDate } from '@plone/volto/helpers/Utils/Date';
import { getImage, getText } from '@eeacms/volto-listing-block/helpers';
import PreviewImage from './PreviewImage';

const tabletBreakpoint = 835;
const mobileBreakpoint = 480;

const Card = ({ item, isEditMode }) => {
  const { title, description, EffectiveDate } = item;
  const locale = config.settings.dateLocale || 'en-gb';

  return (
    <UiCard
      fluid={true}
      // className={cx(
      //   {
      //     rounded: data.rounded,
      //   },
      //   item.theme || data.theme,
      //   data.rounded ? data.roundedSize || 'small' : null,
      // )}
    >
      <ConditionalLink className="image" item={item} condition={!isEditMode}>
        <PreviewImage item={item} alt={item.title} />
      </ConditionalLink>
      <UiCard.Content>
        {title && <UiCard.Header>{title}</UiCard.Header>}
        {EffectiveDate !== 'None' && (
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
        {description && <UiCard.Description>{description}</UiCard.Description>}
      </UiCard.Content>
    </UiCard>
  );
};

const getSlidesToShow = (items, _slidesToShow) => {
  if (items.length >= _slidesToShow) return parseInt(_slidesToShow);
  return items.length;
};

const getSlidesToScroll = (items, _slidesToShow, _slidesToScroll) => {
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
        className="slider-arrow prev-arrow"
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
        className="slider-arrow next-arrow"
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

  const slidesToShow = useMemo(
    () => getSlidesToShow(items, rest.slidesToShow || 3),
    [items, rest.slidesToShow],
  );
  const slidesToScroll = useMemo(
    () =>
      getSlidesToScroll(
        items,
        rest.slidesToShow || 3,
        rest.slidesToScroll || 1,
      ),
    [items, rest.slidesToShow, rest.slidesToScroll],
  );

  const settings = useMemo(() => {
    return {
      dots: true,
      infinite: true,
      slidesToShow,
      slidesToScroll,
      responsive: [
        {
          breakpoint: tabletBreakpoint,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: mobileBreakpoint,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  }, [slidesToShow, slidesToScroll]);

  return (
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
      {items.length > slidesToShow && <Arrows slider={slider} />}
    </div>
  );
};

export default CardsCarousel;
