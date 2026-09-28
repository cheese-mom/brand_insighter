update public.activities set faq_items = jsonb_build_array(
  jsonb_build_object('question', '브랜딩을 먼저 끝내고 광고해야 하나요?', 'answer', '브랜드의 핵심 고객과 선택 이유를 정한 뒤 작은 마케팅 실험으로 검증하는 방식이 현실적입니다. 브랜딩은 한 번 완성하고 끝나는 작업이 아니라 시장 반응에 맞춰 다듬는 과정입니다.'),
  jsonb_build_object('question', '로고를 바꾸면 브랜딩이 달라지나요?', 'answer', '로고는 브랜드를 표현하는 요소입니다. 고객, 차별점, 약속과 경험이 그대로라면 로고만 바꿔도 브랜드 문제가 해결되지는 않습니다.')
) where sort_order = 1;

update public.activities set faq_items = jsonb_build_array(
  jsonb_build_object('question', '광고 대행사를 바꾸면 해결될까요?', 'answer', '매체 운영이 원인이라면 도움이 될 수 있습니다. 그러나 여러 광고에서 비슷한 문제가 반복된다면 상품 제안과 브랜드의 선택 이유를 함께 진단해야 합니다.'),
  jsonb_build_object('question', '브랜딩을 하면 바로 매출이 오르나요?', 'answer', '브랜딩은 즉각적인 매출을 보장하는 수단이 아닙니다. 다만 고객의 이해와 선택, 재구매를 방해하는 문제를 찾아 마케팅이 축적될 기반을 만듭니다.')
) where sort_order = 2;

update public.activities set faq_items = jsonb_build_array(
  jsonb_build_object('question', '가격이 중요한 시장에서도 브랜드가 필요한가요?', 'answer', '필요합니다. 가격 민감도가 높은 시장에서도 고객은 실패 가능성, 시간, 편의, 신뢰를 함께 비교합니다. 브랜드는 가격 외의 판단 근거를 분명하게 만들어 줍니다.'),
  jsonb_build_object('question', '초기 사업자는 저렴하게 시작해야 하지 않나요?', 'answer', '시장 진입을 위한 가격 전략은 가능합니다. 다만 언제까지 누구에게 어떤 이유로 낮은 가격을 제공하는지 기준이 없으면 할인 자체가 브랜드 이미지가 될 수 있습니다.')
) where sort_order = 4;

update public.activities set faq_items = jsonb_build_array(
  jsonb_build_object('question', '브랜딩 효과는 언제부터 나타나나요?', 'answer', '시장, 구매 주기와 활동 범위에 따라 다릅니다. 즉시 달라질 수 있는 것은 메시지 이해도와 전환 과정이고, 인지도와 재구매는 더 긴 관찰이 필요합니다.'),
  jsonb_build_object('question', '브랜딩 성과를 매출로만 평가해도 되나요?', 'answer', '매출은 중요한 최종 지표지만 원인을 설명하지 못합니다. 인지·선호·전환·재구매의 중간 지표를 함께 보아야 개선 방향을 찾을 수 있습니다.')
) where sort_order = 6;

update public.activities set faq_items = jsonb_build_array(
  jsonb_build_object('question', '로고와 인테리어부터 바꿔야 하나요?', 'answer', '핵심 고객과 선택 이유가 먼저입니다. 방향이 정해진 뒤 로고와 공간을 조정해야 같은 비용으로 더 일관된 결과를 만들 수 있습니다.'),
  jsonb_build_object('question', '지역 상권 안에서만 운영해도 필요한가요?', 'answer', '필요합니다. 지역 사업은 재방문과 소개의 비중이 높기 때문에 어떤 경험으로 기억되는지가 더 직접적인 자산이 될 수 있습니다.')
) where sort_order = 7;
