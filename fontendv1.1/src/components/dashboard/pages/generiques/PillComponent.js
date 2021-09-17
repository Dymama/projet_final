

export default function PillComponent(props){
        const infos = props.pillInfos;
    return(
        <>
            {/* Pills navs */}
            <ul class="nav nav-tabs" id="myTab" role="tablist">

                <li class="nav-item">
                    <a class="nav-link active" id="tab-javascript" data-toggle="tab"
                        href="#content-javascript"
                        role="tab" aria-controls="content-javascript" aria-selected="false">
                    {infos.pill1.titre}
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="tab-css" data-toggle="tab"
                        href="#content-css"
                        role="tab" aria-controls="content-css" aria-selected="false">
                        {infos.pill2.titre}
                    </a>
                </li>
            </ul>
            {/* end  pills navs */}

            {/* Content pills */}
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade" id="content-javascript"
                role="tabpanel" aria-labelledby="tab-javascript">
                    {infos.pill1.contenu}
                </div>

                <div class="tab-pane fade" id="content-css"
                role="tabpanel" aria-labelledby="tab-css">

                    {infos.pill2.contenu}

                </div>

            </div>
            {/* Content pills */}

        </>
    )
}