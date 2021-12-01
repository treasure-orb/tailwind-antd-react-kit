import clsx from "clsx";
import React from "react";
import NewsletterStacked, { NewsletterStackedProps } from "./NewsletterStacked";

type NewsletterStackedImageLeftProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Newsletter form
   */
  formProps?: NewsletterStackedProps;

  /**
   * Gap class
   *
   * @default `gap-2`
   */
  gapClass?: string;

  /**
   * Padding
   * when the value is `true`, the tailwind class `p-4` will be applied
   */
  padding?: boolean | string;

  /**
   * Rounded
   * when the value is `true`, the tailwind class `rounded-lg` will be applied
   */
  rounded?: boolean | string;

  /**
   * Bordered
   * when the value is `true`, the tailwind class `border` will be applied
   *
   * @default false
   */
  bordered?: boolean | string;

  /**
   * Shadow
   * when the value is `true`, the tailwind class `shadow-md` will be applied
   *
   * @default false
   */
  shadow?: boolean | string;

  /**
   * Image
   *
   * @default null
   */
  image?: string | React.ReactNode;

  /**
   * Image container width. value of `width` css property
   * @default `150px`
   */
  imageWidth?: string | number;

  /**
   * Image container style
   * @default undefined
   */
  imageContainerStyle?: React.CSSProperties;

  /**
   * Image overlay
   * @default false
   */
  imageOverlay?: boolean | React.CSSProperties;
};

const NewsletterStackedImageLeft = React.forwardRef<
  HTMLDivElement,
  NewsletterStackedImageLeftProps
>((props, ref) => {
  // explode props
  const {
    formProps,
    gapClass,
    rounded,
    padding,
    bordered,
    shadow,
    image,
    imageWidth,
    imageContainerStyle,
    imageOverlay,

    /**
     * Native props
     */
    className,
    ...restProps
  } = props;
  return (
    <div
      ref={ref}
      className={clsx([
        className,
        "flex flex-row flex-nowrap overflow-hidden",
        gapClass,
        typeof bordered === "string" ? bordered : undefined,
        typeof shadow === "string" ? shadow : undefined,
        typeof padding === "string" ? padding : undefined,
        {
          border: bordered === true,
          "rounded-lg": rounded === true,
          "shadow-md": shadow === true,
          "p-4": padding === true,
        },
      ])}
      {...restProps}
    >
      {(() => {
        // explode image container props
        const { backgroundImage, width, ...restImageContainerStyle } =
          imageContainerStyle ?? {};
        return (
          <div
            className={clsx([
              "relative flex items-stretch justify-center overflow-hidden",
            ])}
            style={{
              width: width ?? imageWidth,
              backgroundImage:
                backgroundImage ??
                (typeof image === "string" ? `url(${image})` : undefined),
              ...restImageContainerStyle,
            }}
          >
            {typeof image !== "string" && image}

            {imageOverlay !== undefined && (
              <div
                className={clsx([
                  "absolute w-full h-full",
                  {
                    "bg-primary-500 bg-opacity-25": imageOverlay === true,
                  },
                ])}
                style={
                  typeof imageOverlay !== "boolean" ? imageOverlay : undefined
                }
              ></div>
            )}
          </div>
        );
      })()}
      {(() => {
        // form props
        const {
          padding: formPadding,
          className: formClassName,
          ...restFormProps
        } = formProps ?? {};
        return (
          <NewsletterStacked
            className={clsx([formClassName, "flex-auto"])}
            padding={formPadding ?? true}
            {...restFormProps}
          />
        );
      })()}
    </div>
  );
});

NewsletterStackedImageLeft.defaultProps = {
  imageWidth: "150px",
  rounded: false,
};

export default NewsletterStackedImageLeft;
